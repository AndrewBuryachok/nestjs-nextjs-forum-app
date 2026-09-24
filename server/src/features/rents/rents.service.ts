import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
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
export class RentsService {
  constructor(
    @InjectRepository(Rent)
    private rentsRepository: Repository<Rent>,
    private mqttService: MqttService,
    private transactionsService: TransactionsService,
    private plotsService: PlotsService,
  ) {}

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
