import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) {}

  async getMyPurchases(
    myId: number,
    req: Request,
  ): Promise<Response<Purchase>> {
    const [data, total] = await this.getPurchasesQueryBuilder(req)
      .leftJoin('sellerAccount.cards', 'sellerCards')
      .leftJoin('buyerAccount.cards', 'buyerCards')
      .where(
        new Brackets((qb) =>
          qb
            .where('sellerCards.userId = :myId')
            .orWhere('buyerCards.userId = :myId'),
        ),
        { myId },
      )
      .getManyAndCount();
    return { data, total };
  }

  async getAllPurchases(req: Request): Promise<Response<Purchase>> {
    const [data, total] =
      await this.getPurchasesQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  private getPurchasesQueryBuilder(req: Request): SelectQueryBuilder<Purchase> {
    return this.purchasesRepository
      .createQueryBuilder('purchase')
      .select([
        'purchase.id',
        'purchase.amount',
        'purchase.price',
        'purchase.createdAt',
      ])
      .innerJoin('purchase.good', 'good')
      .addSelect([
        'good.id',
        'good.item',
        'good.description',
        'good.batch',
        'good.unit',
      ])
      .innerJoin('good.shop', 'shop')
      .addSelect(['shop.id', 'shop.name', 'shop.x', 'shop.y'])
      .innerJoin('shop.card', 'sellerCard')
      .addSelect(['sellerCard.id'])
      .innerJoin('sellerCard.account', 'sellerAccount')
      .addSelect(['sellerAccount.id', 'sellerAccount.name'])
      .innerJoin('sellerCard.user', 'sellerUser')
      .addSelect(['sellerUser.id', 'sellerUser.nick', 'sellerUser.avatar'])
      .innerJoin('purchase.card', 'buyerCard')
      .addSelect(['buyerCard.id'])
      .innerJoin('buyerCard.account', 'buyerAccount')
      .addSelect(['buyerAccount.id', 'buyerAccount.name'])
      .innerJoin('buyerCard.user', 'buyerUser')
      .addSelect(['buyerUser.id', 'buyerUser.nick', 'buyerUser.avatar'])
      .orderBy('purchase.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
