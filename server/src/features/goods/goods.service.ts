import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Good } from './good.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Good)
    private goodsRepository: Repository<Good>,
  ) {}

  async getMainGoods(req: Request): Promise<Response<Good>> {
    const [data, total] =
      await this.getGoodsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyGoods(myId: number, req: Request): Promise<Response<Good>> {
    const [data, total] = await this.getGoodsQueryBuilder(req)
      .innerJoin('sellerAccount.cards', 'sellerCards')
      .where('sellerCards.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllGoods(req: Request): Promise<Response<Good>> {
    const [data, total] =
      await this.getGoodsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  private getGoodsQueryBuilder(req: Request): SelectQueryBuilder<Good> {
    return this.goodsRepository
      .createQueryBuilder('good')
      .select([
        'good.id',
        'good.item',
        'good.description',
        'good.amount',
        'good.batch',
        'good.unit',
        'good.price',
        'good.createdAt',
      ])
      .innerJoin('good.shop', 'shop')
      .addSelect(['shop.id', 'shop.name', 'shop.x', 'shop.y'])
      .innerJoin('shop.card', 'sellerCard')
      .addSelect(['sellerCard.id'])
      .innerJoin('sellerCard.account', 'sellerAccount')
      .addSelect(['sellerAccount.id', 'sellerAccount.name'])
      .innerJoin('sellerCard.user', 'sellerUser')
      .addSelect(['sellerUser.id', 'sellerUser.nick', 'sellerUser.avatar'])
      .orderBy('good.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
