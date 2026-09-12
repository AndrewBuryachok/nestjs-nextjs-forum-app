import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Market } from './market.entity';
import { CardsService } from '../cards/cards.service';
import { CreateMarketWithUserDto, EditMarketDto } from './market.dto';
import { MarketError } from './market-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(Market)
    private marketsRepository: Repository<Market>,
    private cardsService: CardsService,
  ) {}

  async getMainMarkets(req: Request): Promise<Response<Market>> {
    const [data, total] =
      await this.getMarketsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyMarkets(myId: number, req: Request): Promise<Response<Market>> {
    const [data, total] = await this.getMarketsQueryBuilder(req)
      .innerJoin('ownerCard.cardUsers', 'ownerCardUsers')
      .where('ownerCardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllMarkets(req: Request): Promise<Response<Market>> {
    const [data, total] =
      await this.getMarketsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  selectUserMarkets(userId: number): Promise<Market[]> {
    return this.selectMarketsQueryBuilder()
      .innerJoin('market.card', 'ownerCard')
      .innerJoin('ownerCard.cardUsers', 'ownerCardUsers')
      .where('ownerCardUsers.userId = :userId', { userId })
      .getMany();
  }

  async createMarket(dto: CreateMarketWithUserDto): Promise<void> {
    await this.cardsService.throwIfNotCardUser(dto.cardId, dto.userId);
    await this.create(dto);
  }

  async editMyMarket(
    myId: number,
    marketId: number,
    dto: EditMarketDto,
  ): Promise<void> {
    await this.throwIfNotMarketOwner(marketId, myId);
    await this.edit(marketId, dto);
  }

  async editUserMarket(marketId: number, dto: EditMarketDto): Promise<void> {
    await this.throwIfMarketNotFound(marketId);
    await this.edit(marketId, dto);
  }

  async deleteMyMarket(myId: number, marketId: number): Promise<void> {
    await this.throwIfNotMarketOwner(marketId, myId);
    await this.delete(marketId);
  }

  async deleteUserMarket(marketId: number): Promise<void> {
    await this.throwIfMarketNotFound(marketId);
    await this.delete(marketId);
  }

  async throwIfMarketNotFound(marketId: number): Promise<Market> {
    const market = await this.findMarketById(marketId);
    if (!market) {
      throw new NotFoundException(MarketError.NOT_FOUND);
    }
    return market;
  }

  async throwIfNotMarketOwner(
    marketId: number,
    userId: number,
  ): Promise<Market> {
    const market = await this.throwIfMarketNotFound(marketId);
    const isCardUser = await this.cardsService.isCardUser(
      market.cardId,
      userId,
    );
    if (!isCardUser) {
      throw new ForbiddenException(MarketError.NOT_OWNER);
    }
    return market;
  }

  async throwIfMarketHasPlot(marketId: number): Promise<void> {
    const plot = await this.marketsRepository.manager.existsBy('plots', {
      marketId,
    });
    if (plot) {
      throw new BadRequestException(MarketError.HAS_PLOT);
    }
  }

  private findMarketById(id: number): Promise<Market | null> {
    return this.marketsRepository.findOneBy({ id });
  }

  private async create(dto: CreateMarketWithUserDto): Promise<Market> {
    try {
      const market = this.marketsRepository.create({
        userId: dto.userId,
        cardId: dto.cardId,
        name: dto.name,
        x: dto.x,
        y: dto.y,
      });
      await this.marketsRepository.save(market);
      return market;
    } catch (error) {
      throw new InternalServerErrorException(MarketError.CREATE_FAILED);
    }
  }

  private async edit(id: number, dto: EditMarketDto): Promise<void> {
    try {
      await this.marketsRepository.update(
        { id },
        { name: dto.name, x: dto.x, y: dto.y },
      );
    } catch (error) {
      throw new InternalServerErrorException(MarketError.EDIT_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.marketsRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(MarketError.DELETE_FAILED);
    }
  }

  private selectMarketsQueryBuilder(): SelectQueryBuilder<Market> {
    return this.marketsRepository
      .createQueryBuilder('market')
      .select(['market.id', 'market.name', 'market.x', 'market.y'])
      .orderBy('market.name', 'ASC');
  }

  private getMarketsQueryBuilder(req: Request): SelectQueryBuilder<Market> {
    return this.marketsRepository
      .createQueryBuilder('market')
      .select([
        'market.id',
        'market.name',
        'market.x',
        'market.y',
        'market.createdAt',
      ])
      .innerJoin('market.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .innerJoin('market.card', 'ownerCard')
      .addSelect(['ownerCard.id', 'ownerCard.name'])
      .orderBy('market.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
