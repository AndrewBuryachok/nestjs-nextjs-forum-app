import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Invoice } from './invoice.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { CardsService } from '../cards/cards.service';
import { CreateInvoiceWithUserDto } from './invoice.dto';
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
