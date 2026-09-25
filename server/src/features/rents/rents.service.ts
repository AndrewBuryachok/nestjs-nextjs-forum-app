import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, MoreThan, Repository, SelectQueryBuilder } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Rent } from './rent.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { TransactionsService } from '../transactions/transactions.service';
import { PlotsService } from '../plots/plots.service';
import { CreateRentWithUserDto } from './rent.dto';
import { RentError } from './rent-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification, TransactionType } from '../../common/enums';

@Injectable()
export class RentsService implements OnModuleInit {
  constructor(
    @InjectRepository(Rent)
    private rentsRepository: Repository<Rent>,
    private mqttService: MqttService,
    private transactionsService: TransactionsService,
    private plotsService: PlotsService,
  ) {}

  async onModuleInit() {
    const rents = await this.rentsRepository.findBy({
      completedAt: MoreThan(new Date()),
    });
    for (const rent of rents) {
      this.addTimeout(rent.id, rent.userId, rent.completedAt);
    }
  }

  async getMainRents(req: Request): Promise<Response<Rent>> {
    const [data, total] = await this.getRentsQueryBuilder(req)
      .andWhere('rent.completedAt > NOW()')
      .getManyAndCount();
    return { data, total };
  }

  async getMyRents(myId: number, req: Request): Promise<Response<Rent>> {
    const [data, total] = await this.getMyRentsQueryBuilder(myId, req)
      .andWhere('rent.completedAt > NOW()')
      .getManyAndCount();
    return { data, total };
  }

  async getCompletedRents(myId: number, req: Request): Promise<Response<Rent>> {
    const [data, total] = await this.getMyRentsQueryBuilder(myId, req)
      .andWhere('rent.completedAt < NOW()')
      .getManyAndCount();
    return { data, total };
  }

  async getAllRents(req: Request): Promise<Response<Rent>> {
    const [data, total] =
      await this.getRentsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  selectUserRents(userId: number): Promise<Rent[]> {
    return this.selectRentsQueryBuilder()
      .innerJoin('rent.card', 'ownerCard')
      .innerJoin('ownerCard.cardUsers', 'ownerCardUsers')
      .andWhere('ownerCardUsers.userId = :userId', { userId })
      .getMany();
  }

  @Transactional()
  async createRent(dto: CreateRentWithUserDto): Promise<void> {
    const plot = await this.plotsService.throwIfPlotNotFound(dto.plotId);
    await this.plotsService.throwIfPlotHasRent(dto.plotId);
    await this.transactionsService.createTransferTransaction({
      senderUserId: dto.userId,
      senderCardId: dto.cardId,
      receiverUserId: plot.userId,
      receiverCardId: plot.cardId,
      type: TransactionType.RESERVE_PLOT,
      sum: plot.price,
      description: plot.name,
    });
    const rent = await this.create(dto);
    this.mqttService.publishNotification(
      dto.userId,
      plot.userId,
      rent.id,
      Notification.CREATE_RENT,
    );
    this.addTimeout(rent.id, dto.userId, rent.completedAt);
  }

  async continueMyRent(myId: number, rentId: number): Promise<void> {
    const rent = await this.throwIfNotRentOwner(rentId, myId);
    await this.continueRent(rent);
  }

  async continueUserRent(rentId: number): Promise<void> {
    const rent = await this.throwIfRentNotFound(rentId);
    await this.continueRent(rent);
  }

  @Transactional()
  private async continueRent(rent: Rent): Promise<void> {
    this.throwIfRentAlreadyCompleted(rent);
    await this.transactionsService.createTransferTransaction({
      senderUserId: rent.userId,
      senderCardId: rent.cardId,
      receiverUserId: rent.plot.userId,
      receiverCardId: rent.plot.cardId,
      type: TransactionType.CONTINUE_RENT,
      sum: rent.plot.price,
      description: rent.plot.name,
    });
    const date = await this.continue(rent.id, rent.completedAt);
    this.mqttService.publishNotification(
      rent.userId,
      rent.plot.userId,
      rent.id,
      Notification.CONTINUE_RENT,
    );
    this.removeTimeout(rent.id);
    this.addTimeout(rent.id, rent.userId, date);
  }

  async completeMyRent(myId: number, rentId: number): Promise<void> {
    const rent = await this.throwIfNotRentOwner(rentId, myId);
    await this.completeRent(rent);
  }

  async completeUserRent(rentId: number): Promise<void> {
    const rent = await this.throwIfRentNotFound(rentId);
    await this.completeRent(rent);
  }

  private async completeRent(rent: Rent): Promise<void> {
    this.throwIfRentAlreadyCompleted(rent);
    await this.complete(rent.id);
    this.mqttService.publishNotification(
      rent.userId,
      rent.plot.userId,
      rent.id,
      Notification.COMPLETE_RENT,
    );
    this.removeTimeout(rent.id);
  }

  async throwIfRentNotFound(rentId: number): Promise<Rent> {
    const rent = await this.findRentById(rentId);
    if (!rent) {
      throw new NotFoundException(RentError.NOT_FOUND);
    }
    return rent;
  }

  async throwIfNotRentOwner(rentId: number, userId: number): Promise<Rent> {
    const rent = await this.throwIfRentNotFound(rentId);
    if (rent.userId !== userId) {
      throw new ForbiddenException(RentError.NOT_OWNER);
    }
    return rent;
  }

  private throwIfRentAlreadyCompleted(rent: Rent): void {
    if (rent.completedAt < new Date()) {
      throw new BadRequestException(RentError.ALREADY_COMPLETED);
    }
  }

  private findRentById(id: number): Promise<Rent | null> {
    return this.rentsRepository.findOne({
      relations: { plot: true },
      where: { id },
    });
  }

  private addTimeout(id: number, userId: number, date: Date) {
    const before = new Date(date);
    before.setDate(before.getDate() - 3);
    if (before.getTime() > new Date().getTime()) {
      this.mqttService.scheduleNotification(
        `rents/${id}/remind`,
        before,
        0,
        userId,
        id,
        Notification.REMIND_RENT,
      );
    }
    this.mqttService.scheduleNotification(
      `rents/${id}/expire`,
      date,
      0,
      userId,
      id,
      Notification.EXPIRE_RENT,
    );
  }

  private removeTimeout(id: number) {
    this.mqttService.unscheduleNotification(`rents/${id}/remind`);
    this.mqttService.unscheduleNotification(`rents/${id}/expire`);
  }

  private async create(dto: CreateRentWithUserDto): Promise<Rent> {
    try {
      const completedAt = new Date();
      completedAt.setDate(completedAt.getDate() + 7);
      const rent = this.rentsRepository.create({
        plotId: dto.plotId,
        userId: dto.userId,
        cardId: dto.cardId,
        completedAt,
      });
      await this.rentsRepository.save(rent);
      return rent;
    } catch (error) {
      throw new InternalServerErrorException(RentError.CREATE_FAILED);
    }
  }

  private async continue(id: number, date: Date): Promise<Date> {
    try {
      const completedAt = new Date(date);
      completedAt.setDate(completedAt.getDate() + 7);
      await this.rentsRepository.update({ id }, { completedAt });
      return completedAt;
    } catch (error) {
      throw new InternalServerErrorException(RentError.CONTINUE_FAILED);
    }
  }

  private async complete(id: number): Promise<void> {
    try {
      await this.rentsRepository.update({ id }, { completedAt: new Date() });
    } catch (error) {
      throw new InternalServerErrorException(RentError.COMPLETE_FAILED);
    }
  }

  private selectRentsQueryBuilder(): SelectQueryBuilder<Rent> {
    return this.rentsRepository
      .createQueryBuilder('rent')
      .select(['rent.id'])
      .innerJoin('rent.plot', 'plot')
      .addSelect(['plot.id', 'plot.name', 'plot.x', 'plot.y'])
      .where('rent.completedAt > NOW()')
      .orderBy('plot.name', 'ASC');
  }

  private getMyRentsQueryBuilder(
    myId: number,
    req: Request,
  ): SelectQueryBuilder<Rent> {
    return this.getRentsQueryBuilder(req)
      .leftJoin('ownerCard.cardUsers', 'ownerCardUsers')
      .leftJoin('renterCard.cardUsers', 'renterCardUsers')
      .andWhere(
        new Brackets((qb) =>
          qb
            .where('ownerCardUsers.userId = :myId')
            .orWhere('renterCardUsers.userId = :myId'),
        ),
        { myId },
      );
  }

  private getRentsQueryBuilder(req: Request): SelectQueryBuilder<Rent> {
    return this.rentsRepository
      .createQueryBuilder('rent')
      .select(['rent.id', 'rent.createdAt', 'rent.completedAt'])
      .innerJoin('rent.plot', 'plot')
      .addSelect(['plot.id', 'plot.name', 'plot.x', 'plot.y', 'plot.price'])
      .innerJoin('plot.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .innerJoin('plot.card', 'ownerCard')
      .addSelect(['ownerCard.id', 'ownerCard.name'])
      .innerJoin('rent.user', 'renterUser')
      .addSelect(['renterUser.id', 'renterUser.nick', 'renterUser.avatar'])
      .innerJoin('rent.card', 'renterCard')
      .addSelect(['renterCard.id', 'renterCard.name'])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('rent.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb.where('rent.userId = :userId').orWhere('plot.userId = :userId'),
        ),
        { userId: req.user },
      )
      .orderBy('rent.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
