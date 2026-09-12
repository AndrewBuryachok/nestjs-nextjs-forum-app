import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Plot } from './plot.entity';
import { CreatePlotWithUserDto } from './plot.dto';
import { PlotError } from './plot-errors.enum';
import { MarketsService } from '../markets/markets.service';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class PlotsService {
  constructor(
    @InjectRepository(Plot)
    private plotsRepository: Repository<Plot>,
    private marketsService: MarketsService,
  ) {}

  async getMainPlots(req: Request): Promise<Response<Plot>> {
    const [data, total] = await this.getPlotsQueryBuilder(req)
      .andWhere(
        new Brackets((qb) =>
          qb
            .where('plot.reservedUntil IS NULL')
            .orWhere('plot.reservedUntil < NOW()'),
        ),
      )
      .getManyAndCount();
    return { data, total };
  }

  async getMyPlots(myId: number, req: Request): Promise<Response<Plot>> {
    const [data, total] = await this.getPlotsQueryBuilder(req)
      .innerJoin('ownerCard.cardUsers', 'ownerCardUsers')
      .where('ownerCardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllPlots(req: Request): Promise<Response<Plot>> {
    const [data, total] =
      await this.getPlotsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createPlot(dto: CreatePlotWithUserDto): Promise<void> {
    await this.marketsService.throwIfNotMarketOwner(dto.marketId, dto.userId);
    await this.create(dto);
  }

  private async create(dto: CreatePlotWithUserDto): Promise<Plot> {
    try {
      const plot = this.plotsRepository.create({
        marketId: dto.marketId,
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
        'plot.reservedUntil',
      ])
      .innerJoin('plot.market', 'market')
      .addSelect(['market.id', 'market.name', 'market.x', 'market.y'])
      .innerJoin('market.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .innerJoin('market.card', 'ownerCard')
      .addSelect(['ownerCard.id', 'ownerCard.name'])
      .orderBy('plot.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
