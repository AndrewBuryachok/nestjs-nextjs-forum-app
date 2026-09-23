import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Plot } from './plot.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { CardsService } from '../cards/cards.service';
import { CreatePlotWithUserDto } from './plot.dto';
import { PlotError } from './plot-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class PlotsService {
  constructor(
    @InjectRepository(Plot)
    private plotsRepository: Repository<Plot>,
    private mqttService: MqttService,
    private cardsService: CardsService,
  ) {}

  async getMainPlots(req: Request): Promise<Response<Plot>> {
    const [data, total] =
      await this.getPlotsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyPlots(myId: number, req: Request): Promise<Response<Plot>> {
    const [data, total] = await this.getPlotsQueryBuilder(req)
      .innerJoin('ownerCard.cardUsers', 'ownerCardUsers')
      .andWhere('ownerCardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllPlots(req: Request): Promise<Response<Plot>> {
    const [data, total] =
      await this.getPlotsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createPlot(dto: CreatePlotWithUserDto): Promise<void> {
    await this.cardsService.throwIfNotCardUser(dto.cardId, dto.userId);
    const plot = await this.create(dto);
    this.mqttService.publishNotification(
      dto.userId,
      0,
      plot.id,
      Notification.CREATE_PLOT,
    );
  }

  private async create(dto: CreatePlotWithUserDto): Promise<Plot> {
    try {
      const plot = this.plotsRepository.create({
        userId: dto.userId,
        cardId: dto.cardId,
        name: dto.name,
        x: dto.x,
        y: dto.y,
        price: dto.price,
      });
      await this.plotsRepository.save(plot);
      return plot;
    } catch (error) {
      throw new InternalServerErrorException(PlotError.CREATE_FAILED);
    }
  }

  private getPlotsQueryBuilder(req: Request): SelectQueryBuilder<Plot> {
    return this.plotsRepository
      .createQueryBuilder('plot')
      .select([
        'plot.id',
        'plot.name',
        'plot.x',
        'plot.y',
        'plot.price',
        'plot.createdAt',
      ])
      .innerJoin('plot.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .innerJoin('plot.card', 'ownerCard')
      .addSelect(['ownerCard.id', 'ownerCard.name'])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('plot.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user && qb.where('plot.userId = :userId', { userId: req.user }),
        ),
      )
      .orderBy('plot.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
