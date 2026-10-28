import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  IsNull,
  MoreThan,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Fine } from './fine.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { CardsService } from '../cards/cards.service';
import { TransactionsService } from '../transactions/transactions.service';
import { CreateFineDto, EditFineDto, PayFineDto } from './fine.dto';
import { FineError } from './fine-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification, TransactionType } from '../../common/enums';

@Injectable()
export class FinesService implements OnModuleInit {
  constructor(
    @InjectRepository(Fine)
    private finesRepository: Repository<Fine>,
    private mqttService: MqttService,
    private cardsService: CardsService,
    private transactionsService: TransactionsService,
  ) {}

  async onModuleInit() {
    const fines = await this.finesRepository.findBy({
      completedAt: MoreThan(new Date()),
      paidAt: IsNull(),
    });
    for (const fine of fines) {
      this.addTimeout(fine.id, fine.receiverUserId, fine.completedAt);
    }
  }

  async getMyFines(myId: number, req: Request): Promise<Response<Fine>> {
    const [data, total] = await this.getMyFinesQueryBuilder(myId, req)
      .andWhere('fine.paidAt IS NULL')
      .getManyAndCount();
    return { data, total };
  }

  async getPaidFines(myId: number, req: Request): Promise<Response<Fine>> {
    const [data, total] = await this.getMyFinesQueryBuilder(myId, req)
      .andWhere('fine.paidAt IS NOT NULL')
      .getManyAndCount();
    return { data, total };
  }

  async getAllFines(req: Request): Promise<Response<Fine>> {
    const [data, total] =
      await this.getFinesQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createFine(dto: CreateFineDto): Promise<void> {
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
    this.addTimeout(fine.id, dto.receiverUserId, fine.completedAt);
  }

  async editFine(fineId: number, dto: EditFineDto): Promise<void> {
    const fine = await this.throwIfFineNotFound(fineId);
    await this.edit(fine.id, dto);
  }

  async deleteFine(fineId: number): Promise<void> {
    const fine = await this.throwIfFineNotFound(fineId);
    await this.delete(fine.id);
    this.removeTimeout(fine.id);
  }

  @Transactional()
  async payFine(myId: number, fineId: number, dto: PayFineDto): Promise<void> {
    const fine = await this.throwIfNotFineReceiver(fineId, myId);
    await this.transactionsService.createTransferTransaction({
      senderUserId: myId,
      senderCardId: dto.cardId,
      receiverUserId: fine.senderUserId,
      receiverCardId: fine.senderCardId,
      type: TransactionType.PAY_FINE,
      sum: fine.sum,
      description: fine.description,
    });
    await this.pay(fineId, dto);
    this.mqttService.publishNotification(
      myId,
      fine.senderUserId,
      fineId,
      Notification.PAY_FINE,
    );
    this.removeTimeout(fineId);
  }

  async throwIfFineNotFound(fineId: number): Promise<Fine> {
    const fine = await this.findFineById(fineId);
    if (!fine) {
      throw new NotFoundException(FineError.NOT_FOUND);
    }
    if (fine.paidAt) {
      throw new BadRequestException(FineError.ALREADY_PAID);
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

  private findFineById(id: number): Promise<Fine | null> {
    return this.finesRepository.findOneBy({ id });
  }

  private addTimeout(id: number, userId: number, date: Date) {
    const before = new Date(date);
    before.setDate(before.getDate() - 3);
    this.mqttService.scheduleNotification(
      `fines/${id}/remind`,
      before,
      0,
      userId,
      id,
      Notification.REMIND_FINE,
    );
    this.mqttService.scheduleNotification(
      `fines/${id}/expire`,
      date,
      0,
      userId,
      id,
      Notification.EXPIRE_FINE,
    );
  }

  private removeTimeout(id: number) {
    this.mqttService.unscheduleNotification(`fines/${id}/remind`);
    this.mqttService.unscheduleNotification(`fines/${id}/expire`);
  }

  private async create(dto: CreateFineDto): Promise<Fine> {
    try {
      const completedAt = new Date();
      completedAt.setDate(completedAt.getDate() + 7);
      const fine = this.finesRepository.create({
        senderUserId: dto.senderUserId,
        senderCardId: dto.senderCardId,
        receiverUserId: dto.receiverUserId,
        sum: dto.sum,
        description: dto.description,
        completedAt,
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

  private getMyFinesQueryBuilder(
    myId: number,
    req: Request,
  ): SelectQueryBuilder<Fine> {
    return this.getFinesQueryBuilder(req)
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
      );
  }

  private getFinesQueryBuilder(req: Request): SelectQueryBuilder<Fine> {
    return this.finesRepository
      .createQueryBuilder('fine')
      .select([
        'fine.id',
        'fine.sum',
        'fine.description',
        'fine.createdAt',
        'fine.completedAt',
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
