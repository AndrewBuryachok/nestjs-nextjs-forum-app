import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Product } from './product.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async getMainProducts(req: Request): Promise<Response<Product>> {
    const [data, total] =
      await this.getProductsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyProducts(myId: number, req: Request): Promise<Response<Product>> {
    const [data, total] = await this.getProductsQueryBuilder(req)
      .innerJoin('sellerCard.cardUsers', 'sellerCardUsers')
      .where('sellerCardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllProducts(req: Request): Promise<Response<Product>> {
    const [data, total] =
      await this.getProductsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  private getProductsQueryBuilder(req: Request): SelectQueryBuilder<Product> {
    return this.productsRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.item',
        'product.description',
        'product.amount',
        'product.batch',
        'product.unit',
        'product.price',
        'product.createdAt',
      ])
      .innerJoin('product.shop', 'shop')
      .addSelect(['shop.id', 'shop.name', 'shop.x', 'shop.y'])
      .innerJoin('shop.card', 'sellerCard')
      .addSelect(['sellerCard.id', 'sellerCard.name'])
      .innerJoin('product.user', 'sellerUser')
      .addSelect(['sellerUser.id', 'sellerUser.nick', 'sellerUser.avatar'])
      .orderBy('product.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
