import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Good } from './good.entity';
import { ShopsService } from '../shops/shops.service';
import { TransactionsService } from '../transactions/transactions.service';
import {
  BuyGoodDto,
  DeleteGoodDto,
  ExtCreateGoodDto,
  ExtEditGoodDto,
} from './good.dto';
import { GoodError } from './good-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Good)
    private goodsRepository: Repository<Good>,
    private shopsService: ShopsService,
    private transactionsService: TransactionsService,
  ) {}

  async getMainGoods(req: Request): Promise<Response<Good>> {
    const [data, total] = await this.getGoodsQueryBuilder(req)
      .where('good.amount > 0')
      .getManyAndCount();
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

  async editGood(dto: ExtEditGoodDto): Promise<void> {
    await this.throwIfNotGoodOwner(dto.goodId, dto.myId, dto.isAll);
    await this.edit(dto.goodId, dto);
  }

  async deleteGood(dto: DeleteGoodDto): Promise<void> {
    await this.throwIfNotGoodOwner(dto.goodId, dto.myId, dto.isAll);
    await this.delete(dto.goodId);
  }

  async buyGood(dto: BuyGoodDto): Promise<number> {
    const good = await this.throwIfGoodNotFound(dto.goodId);
    if (good.amount < dto.amount) {
      throw new BadRequestException(GoodError.NOT_ENOUGH_AMOUNT);
    }
    const shop = await this.shopsService.throwIfShopNotFound(good.shopId);
    await this.transactionsService.createTransferTransaction({
      senderCardId: dto.cardId,
      receiverCardId: shop.cardId,
      sum: dto.amount * good.price,
      description: 'купівля товару',
      myId: dto.myId,
      isAll: dto.isAll,
    });
    await this.decreaseAmount(dto.goodId, dto.amount);
    return good.price;
  }

  async throwIfGoodNotFound(goodId: number): Promise<Good> {
    const good = await this.findGoodById(goodId);
    if (!good) {
      throw new NotFoundException(GoodError.NOT_FOUND);
    }
    return good;
  }

  async throwIfNotGoodOwner(
    goodId: number,
    userId: number,
    isAll: boolean,
  ): Promise<Good> {
    const good = await this.throwIfGoodNotFound(goodId);
    const isShopOwner = await this.shopsService.isShopOwner(
      good.shopId,
      userId,
      isAll,
    );
    if (!isShopOwner) {
      throw new ForbiddenException(GoodError.NOT_OWNER);
    }
    return good;
  }

  private findGoodById(id: number): Promise<Good | null> {
    return this.goodsRepository.findOneBy({ id });
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

  private async edit(id: number, dto: ExtEditGoodDto): Promise<void> {
    try {
      await this.goodsRepository.update(
        { id },
        {
          item: dto.item,
          description: dto.description,
          amount: dto.amount,
          batch: dto.batch,
          unit: dto.unit,
          price: dto.price,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(GoodError.EDIT_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.goodsRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(GoodError.DELETE_FAILED);
    }
  }

  private async decreaseAmount(id: number, amount: number): Promise<void> {
    try {
      await this.goodsRepository.decrement({ id }, 'amount', amount);
    } catch (error) {
      throw new InternalServerErrorException(GoodError.DECREASE_AMOUNT_FAILED);
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
