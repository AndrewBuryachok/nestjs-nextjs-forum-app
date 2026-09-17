import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, MoreThan, Repository, SelectQueryBuilder } from 'typeorm';
import { Plot } from './plot.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { CardsService } from '../cards/cards.service';
import { CreatePlotWithUserDto, EditPlotDto } from './plot.dto';
import { PlotError } from './plot-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification, Sort } from '../../common/enums';

@Injectable()
export class PlotsService {
  constructor(
    @InjectRepository(Plot)
    private plotsRepository: Repository<Plot>,
    private mqttService: MqttService,
    private cardsService: CardsService,
  ) {}

  async getMainPlots(req: Request): Promise<Response<Plot>> {
    const [data, total] = await this.getPlotsQueryBuilder(req)
      .andWhere('rent.id IS NULL')
      .getManyAndCount();
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

  async editMyPlot(
    myId: number,
    plotId: number,
    dto: EditPlotDto,
  ): Promise<void> {
    await this.throwIfNotPlotOwner(plotId, myId);
    await this.edit(plotId, dto);
  }

  async editUserPlot(plotId: number, dto: EditPlotDto): Promise<void> {
    await this.throwIfPlotNotFound(plotId);
    await this.edit(plotId, dto);
  }

  async deleteMyPlot(myId: number, plotId: number): Promise<void> {
    await this.throwIfNotPlotOwner(plotId, myId);
    await this.throwIfPlotHasRent(plotId);
    await this.delete(plotId);
  }

  async deleteUserPlot(plotId: number): Promise<void> {
    await this.throwIfPlotNotFound(plotId);
    await this.throwIfPlotHasRent(plotId);
    await this.delete(plotId);
  }

  async throwIfPlotNotFound(plotId: number): Promise<Plot> {
    const plot = await this.findPlotById(plotId);
    if (!plot) {
      throw new NotFoundException(PlotError.NOT_FOUND);
    }
    return plot;
  }

  async throwIfNotPlotOwner(plotId: number, userId: number): Promise<Plot> {
    const plot = await this.throwIfPlotNotFound(plotId);
    const isCardUser = await this.cardsService.isCardUser(plot.cardId, userId);
    if (!isCardUser) {
      throw new ForbiddenException(PlotError.NOT_OWNER);
    }
    return plot;
  }

  async throwIfPlotHasRent(plotId: number): Promise<void> {
    const rent = await this.plotsRepository.manager.existsBy('rents', {
      plotId,
      completedAt: MoreThan(new Date()),
    });
    if (rent) {
      throw new BadRequestException(PlotError.HAS_RENT);
    }
  }

  private findPlotById(id: number): Promise<Plot | null> {
    return this.plotsRepository.findOneBy({ id });
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

  private async edit(id: number, dto: EditPlotDto): Promise<void> {
    try {
      await this.plotsRepository.update(
        { id },
        { name: dto.name, x: dto.x, y: dto.y, price: dto.price },
      );
    } catch (error) {
      throw new InternalServerErrorException(PlotError.EDIT_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.plotsRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(PlotError.DELETE_FAILED);
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
      .leftJoinAndMapOne(
        'plot.rent',
        'plot.rents',
        'rent',
        'rent.completedAt > NOW()',
      )
      .addSelect(['rent.id', 'rent.createdAt', 'rent.completedAt'])
      .leftJoin('rent.user', 'renterUser')
      .addSelect(['renterUser.id', 'renterUser.nick', 'renterUser.avatar'])
      .leftJoin('rent.card', 'renterCard')
      .addSelect(['renterCard.id', 'renterCard.name'])
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
      .orderBy({
        ...(req.sort === Sort.ASC && { 'plot.price': 'ASC' }),
        ...(req.sort === Sort.DESC && { 'plot.price': 'DESC' }),
        'plot.id': 'DESC',
      })
      .skip(req.skip)
      .take(req.take);
  }
}
