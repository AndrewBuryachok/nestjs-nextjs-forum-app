import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Good } from './good.entity';
import { ShopsService } from '../shops/shops.service';
import { ExtCreateGoodDto } from './good.dto';
import { GoodError } from './good-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Good)
    private goodsRepository: Repository<Good>,
    private shopsService: ShopsService,
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

  async createGood(dto: ExtCreateGoodDto): Promise<void> {
    await this.shopsService.throwIfNotShopOwner(
      dto.shopId,
      dto.myId,
      dto.isAll,
    );
    await this.create(dto);
  }

  private async create(dto: ExtCreateGoodDto): Promise<Good> {
    try {
      const good = this.goodsRepository.create({
        shopId: dto.shopId,
        item: dto.item,
        description: dto.description,
        amount: dto.amount,
        batch: dto.batch,
        unit: dto.unit,
        price: dto.price,
      });
      await this.goodsRepository.save(good);
      return good;
    } catch (error) {
      throw new InternalServerErrorException(GoodError.CREATE_FAILED);
    }
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
