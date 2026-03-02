import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Shop } from './shop.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private shopsRepository: Repository<Shop>,
  ) {}

  async getMainShops(req: Request): Promise<Response<Shop>> {
    const [data, total] =
      await this.getShopsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyShops(myId: number, req: Request): Promise<Response<Shop>> {
    const [data, total] = await this.getShopsQueryBuilder(req)
      .innerJoin('ownerAccount.cards', 'ownerCards')
      .where('ownerCards.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllShops(req: Request): Promise<Response<Shop>> {
    const [data, total] =
      await this.getShopsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  private getShopsQueryBuilder(req: Request): SelectQueryBuilder<Shop> {
    return this.shopsRepository
      .createQueryBuilder('shop')
      .select(['shop.id', 'shop.name', 'shop.x', 'shop.y', 'shop.createdAt'])
      .innerJoin('shop.card', 'ownerCard')
      .addSelect(['ownerCard.id'])
      .innerJoin('ownerCard.account', 'ownerAccount')
      .addSelect(['ownerAccount.id', 'ownerAccount.name'])
      .innerJoin('ownerCard.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .orderBy('shop.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
