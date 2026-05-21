import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Purchase } from './purchase.entity';
import { TransactionsService } from '../transactions/transactions.service';
import { ProductsService } from '../products/products.service';
import { CreatePurchaseWithUserDto } from './purchase.dto';
import { PurchaseError } from './purchase-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    private transactionsService: TransactionsService,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
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

  @Transactional()
  async createPurchase(dto: CreatePurchaseWithUserDto): Promise<void> {
    const product = await this.productsService.throwIfNotEnoughAmount(
      dto.productId,
      dto.amount,
    );
    await this.transactionsService.createUserTransferTransaction({
      senderUserId: dto.userId,
      senderCardId: dto.cardId,
      receiverUserId: product.userId,
      receiverCardId: product.shop.cardId,
      sum: dto.amount * product.price,
      description: 'купівля товару',
    });
    await this.productsService.buyProduct(dto.productId, dto.amount);
    await this.create(dto, product.price);
  }

  @Transactional()
  async deletePurchase(purchaseId: number): Promise<void> {
    const purchase = await this.throwIfPurchaseNotFound(purchaseId);
    await this.productsService.unbuyProduct(
      purchase.productId,
      purchase.amount,
    );
    await this.delete(purchaseId);
  }

  async throwIfPurchaseNotFound(purchaseId: number): Promise<Purchase> {
    const purchase = await this.findPurchaseById(purchaseId);
    if (!purchase) {
      throw new NotFoundException(PurchaseError.NOT_FOUND);
    }
    return purchase;
  }

  async isProductPurchase(productId: number): Promise<boolean> {
    const purchase = await this.findPurchaseByProduct(productId);
    return !!purchase;
  }

  private findPurchaseById(id: number): Promise<Purchase | null> {
    return this.purchasesRepository.findOneBy({ id });
  }

  private findPurchaseByProduct(productId: number): Promise<Purchase | null> {
    return this.purchasesRepository.findOneBy({ productId });
  }

  private async create(
    dto: CreatePurchaseWithUserDto,
    price: number,
  ): Promise<Purchase> {
    try {
      const purchase = this.purchasesRepository.create({
        productId: dto.productId,
        userId: dto.userId,
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
