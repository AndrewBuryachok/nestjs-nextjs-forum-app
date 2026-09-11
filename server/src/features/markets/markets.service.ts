import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Market } from './market.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(Market)
    private marketsRepository: Repository<Market>,
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
