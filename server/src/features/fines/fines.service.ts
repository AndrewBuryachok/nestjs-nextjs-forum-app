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
import { Fine } from './fine.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { CardsService } from '../cards/cards.service';
import { TransactionsService } from '../transactions/transactions.service';
import { CreateFineWithUserDto, EditFineDto, PayFineDto } from './fine.dto';
import { FineError } from './fine-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification, TransactionType } from '../../common/enums';

@Injectable()
export class FinesService {
  constructor(
    @InjectRepository(Fine)
    private finesRepository: Repository<Fine>,
    private mqttService: MqttService,
    private cardsService: CardsService,
    private transactionsService: TransactionsService,
  ) {}

  async getMyFines(myId: number, req: Request): Promise<Response<Fine>> {
    const [data, total] = await this.getFinesQueryBuilder(req)
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

  async getAllFines(req: Request): Promise<Response<Fine>> {
    const [data, total] =
      await this.getFinesQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createFine(dto: CreateFineWithUserDto): Promise<void> {
    await this.cardsService.throwIfNotCardUser(
      dto.senderCardId,
      dto.senderUserId,
    );
    const fine = await this.create(dto);
    this.mqttService.publishNotification(
      dto.senderUserId,
      dto.receiverUserId,
      fine.id,
      Notification.CREATE_FINE,
    );
  }

  async editMyFine(
    myId: number,
    fineId: number,
    dto: EditFineDto,
  ): Promise<void> {
    const fine = await this.throwIfNotFineSender(fineId, myId);
    await this.editFine(fine, dto);
  }

  async editUserFine(fineId: number, dto: EditFineDto): Promise<void> {
    const fine = await this.throwIfFineNotFound(fineId);
    await this.editFine(fine, dto);
  }

  private async editFine(fine: Fine, dto: EditFineDto): Promise<void> {
    this.throwIfFineAlreadyPaid(fine);
    await this.edit(fine.id, dto);
  }

  async deleteMyFine(myId: number, fineId: number): Promise<void> {
    const fine = await this.throwIfNotFineSender(fineId, myId);
    await this.deleteFine(fine);
  }

  async deleteUserFine(fineId: number): Promise<void> {
    const fine = await this.throwIfFineNotFound(fineId);
    await this.deleteFine(fine);
  }

  private async deleteFine(fine: Fine): Promise<void> {
    this.throwIfFineAlreadyPaid(fine);
    await this.delete(fine.id);
  }

  async payMyFine(
    myId: number,
    fineId: number,
    dto: PayFineDto,
  ): Promise<void> {
    const fine = await this.throwIfNotFineReceiver(fineId, myId);
    await this.payFine(fine, dto);
  }

  async payUserFine(fineId: number, dto: PayFineDto): Promise<void> {
    const fine = await this.throwIfFineNotFound(fineId);
    await this.payFine(fine, dto);
  }

  @Transactional()
  private async payFine(fine: Fine, dto: PayFineDto): Promise<void> {
    this.throwIfFineAlreadyPaid(fine);
    await this.transactionsService.createTransferTransaction({
      senderUserId: fine.receiverUserId,
      senderCardId: dto.cardId,
      receiverUserId: fine.senderUserId,
      receiverCardId: fine.senderCardId,
      type: TransactionType.PAY_FINE,
      sum: fine.sum,
      description: fine.description,
    });
    await this.pay(fine.id, dto);
    this.mqttService.publishNotification(
      fine.receiverUserId,
      fine.senderUserId,
      fine.id,
      Notification.PAY_FINE,
    );
  }

  async throwIfFineNotFound(fineId: number): Promise<Fine> {
    const fine = await this.findFineById(fineId);
    if (!fine) {
      throw new NotFoundException(FineError.NOT_FOUND);
    }
    return fine;
  }

  async throwIfNotFineSender(fineId: number, userId: number): Promise<Fine> {
    const fine = await this.throwIfFineNotFound(fineId);
    if (fine.senderUserId !== userId) {
      throw new ForbiddenException(FineError.NOT_SENDER);
    }
    return fine;
  }

  async throwIfNotFineReceiver(fineId: number, userId: number): Promise<Fine> {
    const fine = await this.throwIfFineNotFound(fineId);
    if (fine.receiverUserId !== userId) {
      throw new ForbiddenException(FineError.NOT_RECEIVER);
    }
    return fine;
  }

  private throwIfFineAlreadyPaid(fine: Fine): void {
    if (fine.paidAt) {
      throw new BadRequestException(FineError.ALREADY_PAID);
    }
  }

  private findFineById(id: number): Promise<Fine | null> {
    return this.finesRepository.findOneBy({ id });
  }

  private async create(dto: CreateFineWithUserDto): Promise<Fine> {
    try {
      const fine = this.finesRepository.create({
        senderUserId: dto.senderUserId,
        senderCardId: dto.senderCardId,
        receiverUserId: dto.receiverUserId,
        sum: dto.sum,
        description: dto.description,
      });
      await this.finesRepository.save(fine);
      return fine;
    } catch (error) {
      throw new InternalServerErrorException(FineError.CREATE_FAILED);
    }
  }

  private async edit(id: number, dto: EditFineDto): Promise<void> {
    try {
      await this.finesRepository.update(
        { id },
        { sum: dto.sum, description: dto.description },
      );
    } catch (error) {
      throw new InternalServerErrorException(FineError.EDIT_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.finesRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException(FineError.DELETE_FAILED);
    }
  }

  private async pay(id: number, dto: PayFineDto): Promise<void> {
    try {
      await this.finesRepository.update(
        { id },
        { receiverCardId: dto.cardId, paidAt: new Date() },
      );
    } catch (error) {
      throw new InternalServerErrorException(FineError.PAY_FAILED);
    }
  }

  private getFinesQueryBuilder(req: Request): SelectQueryBuilder<Fine> {
    return this.finesRepository
      .createQueryBuilder('fine')
      .select([
        'fine.id',
        'fine.sum',
        'fine.description',
        'fine.createdAt',
        'fine.paidAt',
      ])
      .innerJoin('fine.senderUser', 'senderUser')
      .addSelect(['senderUser.id', 'senderUser.nick', 'senderUser.avatar'])
      .innerJoin('fine.senderCard', 'senderCard')
      .addSelect(['senderCard.id', 'senderCard.name'])
      .innerJoin('fine.receiverUser', 'receiverUser')
      .addSelect([
        'receiverUser.id',
        'receiverUser.nick',
        'receiverUser.avatar',
      ])
      .leftJoin('fine.receiverCard', 'receiverCard')
      .addSelect(['receiverCard.id', 'receiverCard.name'])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('fine.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb
              .where('fine.senderUserId = :userId')
              .orWhere('fine.receiverUserId = :userId'),
        ),
        { userId: req.user },
      )
      .orderBy('fine.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
