import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Purchase } from './purchase.entity';
import { GoodsService } from '../goods/goods.service';
import { DeletePurchaseDto, ExtCreatePurchaseDto } from './purchase.dto';
import { PurchaseError } from './purchase-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    private goodsService: GoodsService,
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

  async createPurchase(dto: ExtCreatePurchaseDto): Promise<void> {
    const price = await this.goodsService.buyGood(dto);
    await this.create(dto, price);
  }

  async deletePurchase(dto: DeletePurchaseDto): Promise<void> {
    const purchase = await this.throwIfPurchaseNotFound(dto.purchaseId);
    await this.goodsService.unbuyGood(purchase.goodId, purchase.amount);
    await this.delete(dto.purchaseId);
  }

  async throwIfPurchaseNotFound(purchaseId: number): Promise<Purchase> {
    const purchase = await this.findPurchaseById(purchaseId);
    if (!purchase) {
      throw new NotFoundException(PurchaseError.NOT_FOUND);
    }
    return purchase;
  }

  private findPurchaseById(id: number): Promise<Purchase | null> {
    return this.purchasesRepository.findOneBy({ id });
  }

  private async create(
    dto: ExtCreatePurchaseDto,
    price: number,
  ): Promise<Purchase> {
    try {
      const purchase = this.purchasesRepository.create({
        goodId: dto.goodId,
        cardId: dto.cardId,
        amount: dto.amount,
        price,
      });
      await this.purchasesRepository.save(purchase);
      return purchase;
    } catch (error) {
      throw new InternalServerErrorException(PurchaseError.CREATE_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.purchasesRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException(PurchaseError.DELETE_FAILED);
    }
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
