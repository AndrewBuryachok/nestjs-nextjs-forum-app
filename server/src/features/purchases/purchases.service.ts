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
      .leftJoin('sellerCard.cardUsers', 'sellerCardUsers')
      .leftJoin('buyerCard.cardUsers', 'buyerCardUsers')
      .where(
        new Brackets((qb) =>
          qb
            .where('sellerCardUsers.userId = :myId')
            .orWhere('buyerCardUsers.userId = :myId'),
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
      .innerJoin('purchase.product', 'product')
      .addSelect([
        'product.id',
        'product.item',
        'product.description',
        'product.batch',
        'product.unit',
      ])
      .innerJoin('product.shop', 'shop')
      .addSelect(['shop.id', 'shop.name', 'shop.x', 'shop.y'])
      .innerJoin('shop.card', 'sellerCard')
      .addSelect(['sellerCard.id', 'sellerCard.name'])
      .innerJoin('product.user', 'sellerUser')
      .addSelect(['sellerUser.id', 'sellerUser.nick', 'sellerUser.avatar'])
      .innerJoin('purchase.user', 'buyerUser')
      .addSelect(['buyerUser.id', 'buyerUser.nick', 'buyerUser.avatar'])
      .innerJoin('purchase.card', 'buyerCard')
      .addSelect(['buyerCard.id', 'buyerCard.name'])
      .orderBy('purchase.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
