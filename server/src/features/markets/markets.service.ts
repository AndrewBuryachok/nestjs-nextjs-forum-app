import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Market } from './market.entity';
import { CardsService } from '../cards/cards.service';
import { CreateMarketWithUserDto } from './market.dto';
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

  async createMarket(dto: CreateMarketWithUserDto): Promise<void> {
    await this.cardsService.throwIfNotCardUser(dto.cardId, dto.userId);
    await this.create(dto);
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
