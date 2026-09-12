import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Plot } from './plot.entity';
import { CreatePlotWithUserDto, EditPlotDto } from './plot.dto';
import { PlotError } from './plot-errors.enum';
import { CardsService } from '../cards/cards.service';
import { MarketsService } from '../markets/markets.service';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class PlotsService {
  constructor(
    @InjectRepository(Plot)
    private plotsRepository: Repository<Plot>,
    private cardsService: CardsService,
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
    await this.delete(plotId);
  }

  async deleteUserPlot(plotId: number): Promise<void> {
    await this.throwIfPlotNotFound(plotId);
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
    const isCardUser = await this.cardsService.isCardUser(
      plot.market.cardId,
      userId,
    );
    if (!isCardUser) {
      throw new ForbiddenException(PlotError.NOT_OWNER);
    }
    return plot;
  }

  private findPlotById(id: number): Promise<Plot | null> {
    return this.plotsRepository.findOne({
      relations: { market: true },
      where: { id },
    });
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
