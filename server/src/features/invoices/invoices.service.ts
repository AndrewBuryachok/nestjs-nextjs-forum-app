import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Invoice } from './invoice.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { CardsService } from '../cards/cards.service';
import { TransactionsService } from '../transactions/transactions.service';
import {
  CreateInvoiceWithUserDto,
  EditInvoiceDto,
  PayInvoiceDto,
} from './invoice.dto';
import { InvoiceError } from './invoice-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    private mqttService: MqttService,
    private cardsService: CardsService,
    private transactionsService: TransactionsService,
  ) {}

  async getMyInvoices(myId: number, req: Request): Promise<Response<Invoice>> {
    const [data, total] = await this.getInvoicesQueryBuilder(req)
      .innerJoin('senderCard.cardUsers', 'senderCardUsers')
      .leftJoin('receiverCard.cardUsers', 'receiverCardUsers')
      .andWhere(
        new Brackets((qb) =>
          qb
            .where('receiverUser.id = :myId')
            .orWhere('senderCardUsers.userId = :myId')
            .orWhere('receiverCardUsers.userId = :myId'),
        ),
        { myId },
      )
      .getManyAndCount();
    return { data, total };
  }

  async getAllInvoices(req: Request): Promise<Response<Invoice>> {
    const [data, total] =
      await this.getInvoicesQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createInvoice(dto: CreateInvoiceWithUserDto): Promise<void> {
    await this.cardsService.throwIfNotCardUser(
      dto.senderCardId,
      dto.senderUserId,
    );
    const invoice = await this.create(dto);
    this.mqttService.publishNotification(
      dto.senderUserId,
      dto.receiverUserId,
      invoice.id,
      Notification.CREATE_INVOICE,
    );
  }

  async editMyInvoice(
    myId: number,
    invoiceId: number,
    dto: EditInvoiceDto,
  ): Promise<void> {
    const invoice = await this.throwIfNotInvoiceSender(invoiceId, myId);
    await this.editInvoice(invoice, dto);
  }

  async editUserInvoice(invoiceId: number, dto: EditInvoiceDto): Promise<void> {
    const invoice = await this.throwIfInvoiceNotFound(invoiceId);
    await this.editInvoice(invoice, dto);
  }

  private async editInvoice(
    invoice: Invoice,
    dto: EditInvoiceDto,
  ): Promise<void> {
    this.throwIfInvoiceAlreadyPaid(invoice);
    await this.edit(invoice.id, dto);
  }

  async deleteMyInvoice(myId: number, invoiceId: number): Promise<void> {
    const invoice = await this.throwIfNotInvoiceSender(invoiceId, myId);
    await this.deleteInvoice(invoice);
  }

  async deleteUserInvoice(invoiceId: number): Promise<void> {
    const invoice = await this.throwIfInvoiceNotFound(invoiceId);
    await this.deleteInvoice(invoice);
  }

  private async deleteInvoice(invoice: Invoice): Promise<void> {
    this.throwIfInvoiceAlreadyPaid(invoice);
    await this.delete(invoice.id);
  }

  async payMyInvoice(
    myId: number,
    invoiceId: number,
    dto: PayInvoiceDto,
  ): Promise<void> {
    const invoice = await this.throwIfNotInvoiceReceiver(invoiceId, myId);
    await this.payInvoice(invoice, dto);
  }

  async payUserInvoice(invoiceId: number, dto: PayInvoiceDto): Promise<void> {
    const invoice = await this.throwIfInvoiceNotFound(invoiceId);
    await this.payInvoice(invoice, dto);
  }

  @Transactional()
  private async payInvoice(
    invoice: Invoice,
    dto: PayInvoiceDto,
  ): Promise<void> {
    this.throwIfInvoiceAlreadyPaid(invoice);
    await this.transactionsService.createUserTransferTransaction({
      senderUserId: invoice.receiverUserId,
      senderCardId: dto.cardId,
      receiverUserId: invoice.senderUserId,
      receiverCardId: invoice.senderCardId,
      sum: invoice.sum,
      description: 'сплата інвойсу',
    });
    await this.pay(invoice.id, dto);
    this.mqttService.publishNotification(
      invoice.receiverUserId,
      invoice.senderUserId,
      invoice.id,
      Notification.PAY_INVOICE,
    );
  }

  async throwIfInvoiceNotFound(invoiceId: number): Promise<Invoice> {
    const invoice = await this.findInvoiceById(invoiceId);
    if (!invoice) {
      throw new NotFoundException(InvoiceError.NOT_FOUND);
    }
    return invoice;
  }

  async throwIfNotInvoiceSender(
    invoiceId: number,
    userId: number,
  ): Promise<Invoice> {
    const invoice = await this.throwIfInvoiceNotFound(invoiceId);
    if (invoice.senderUserId !== userId) {
      throw new ForbiddenException(InvoiceError.NOT_SENDER);
    }
    return invoice;
  }

  async throwIfNotInvoiceReceiver(
    invoiceId: number,
    userId: number,
  ): Promise<Invoice> {
    const invoice = await this.throwIfInvoiceNotFound(invoiceId);
    if (invoice.receiverUserId !== userId) {
      throw new ForbiddenException(InvoiceError.NOT_RECEIVER);
    }
    return invoice;
  }

  private throwIfInvoiceAlreadyPaid(invoice: Invoice): void {
    if (invoice.paidAt) {
      throw new BadRequestException(InvoiceError.ALREADY_PAID);
    }
  }

  private findInvoiceById(id: number): Promise<Invoice | null> {
    return this.invoicesRepository.findOneBy({ id });
  }

  private async create(dto: CreateInvoiceWithUserDto): Promise<Invoice> {
    try {
      const invoice = this.invoicesRepository.create({
        senderUserId: dto.senderUserId,
        senderCardId: dto.senderCardId,
        receiverUserId: dto.receiverUserId,
        sum: dto.sum,
        description: dto.description,
      });
      await this.invoicesRepository.save(invoice);
      return invoice;
    } catch (error) {
      throw new InternalServerErrorException(InvoiceError.CREATE_FAILED);
    }
  }

  private async edit(id: number, dto: EditInvoiceDto): Promise<void> {
    try {
      await this.invoicesRepository.update(
        { id },
        { sum: dto.sum, description: dto.description },
      );
    } catch (error) {
      throw new InternalServerErrorException(InvoiceError.EDIT_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.invoicesRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException(InvoiceError.DELETE_FAILED);
    }
  }

  private async pay(id: number, dto: PayInvoiceDto): Promise<void> {
    try {
      await this.invoicesRepository.update(
        { id },
        { receiverCardId: dto.cardId, paidAt: new Date() },
      );
    } catch (error) {
      throw new InternalServerErrorException(InvoiceError.PAY_FAILED);
    }
  }

  private getInvoicesQueryBuilder(req: Request): SelectQueryBuilder<Invoice> {
    return this.invoicesRepository
      .createQueryBuilder('invoice')
      .select([
        'invoice.id',
        'invoice.sum',
        'invoice.description',
        'invoice.createdAt',
        'invoice.paidAt',
      ])
      .innerJoin('invoice.senderUser', 'senderUser')
      .addSelect(['senderUser.id', 'senderUser.nick', 'senderUser.avatar'])
      .innerJoin('invoice.senderCard', 'senderCard')
      .addSelect(['senderCard.id', 'senderCard.name'])
      .innerJoin('invoice.receiverUser', 'receiverUser')
      .addSelect([
        'receiverUser.id',
        'receiverUser.nick',
        'receiverUser.avatar',
      ])
      .leftJoin('invoice.receiverCard', 'receiverCard')
      .addSelect(['receiverCard.id', 'receiverCard.name'])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('invoice.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb
              .where('invoice.senderUserId = :userId')
              .orWhere('invoice.receiverUserId = :userId'),
        ),
        { userId: req.user },
      )
      .orderBy('invoice.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
