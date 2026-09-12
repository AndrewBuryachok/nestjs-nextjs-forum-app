import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Product } from './product.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { CardsService } from '../cards/cards.service';
import { ShopsService } from '../shops/shops.service';
import { PurchasesService } from '../purchases/purchases.service';
import {
  CreateProductWithUserDto,
  EditProductAmountAndPriceDto,
  EditProductDto,
} from './product.dto';
import { ProductError } from './product-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private mqttService: MqttService,
    private cardsService: CardsService,
    private shopsService: ShopsService,
    @Inject(forwardRef(() => PurchasesService))
    private purchasesService: PurchasesService,
  ) {}

  async getMainProducts(req: Request): Promise<Response<Product>> {
    const [data, total] = await this.getProductsQueryBuilder(req)
      .andWhere('product.amount > 0')
      .orderBy('product.updatedAt', 'DESC')
      .getManyAndCount();
    return { data, total };
  }

  async getMyProducts(myId: number, req: Request): Promise<Response<Product>> {
    const [data, total] = await this.getProductsQueryBuilder(req)
      .innerJoin('sellerCard.cardUsers', 'sellerCardUsers')
      .andWhere('sellerCardUsers.userId = :myId', { myId })
      .orderBy('product.updatedAt', 'ASC')
      .getManyAndCount();
    return { data, total };
  }

  async getAllProducts(req: Request): Promise<Response<Product>> {
    const [data, total] = await this.getProductsQueryBuilder(req)
      .orderBy('product.id', 'DESC')
      .getManyAndCount();
    return { data, total };
  }

  async createProduct(dto: CreateProductWithUserDto): Promise<void> {
    await this.shopsService.throwIfNotShopOwner(dto.shopId, dto.userId);
    const product = await this.create(dto);
    this.mqttService.publishNotification(
      dto.userId,
      0,
      product.id,
      Notification.CREATE_PRODUCT,
    );
  }

  async editMyProductAmountAndPrice(
    myId: number,
    productId: number,
    dto: EditProductAmountAndPriceDto,
  ): Promise<void> {
    await this.throwIfNotProductOwner(productId, myId);
    await this.throwIfProductNotBought(productId);
    await this.editAmountAndPrice(productId, dto);
  }

  async editUserProductAmountAndPrice(
    productId: number,
    dto: EditProductAmountAndPriceDto,
  ): Promise<void> {
    await this.throwIfProductNotFound(productId);
    await this.throwIfProductNotBought(productId);
    await this.editAmountAndPrice(productId, dto);
  }

  async editMyProduct(
    myId: number,
    productId: number,
    dto: EditProductDto,
  ): Promise<void> {
    await this.throwIfNotProductOwner(productId, myId);
    await this.throwIfProductBought(productId);
    await this.edit(productId, dto);
  }

  async editUserProduct(productId: number, dto: EditProductDto): Promise<void> {
    await this.throwIfProductNotFound(productId);
    await this.throwIfProductBought(productId);
    await this.edit(productId, dto);
  }

  async deleteMyProduct(myId: number, productId: number): Promise<void> {
    await this.throwIfNotProductOwner(productId, myId);
    await this.delete(productId);
  }

  async deleteUserProduct(productId: number): Promise<void> {
    await this.throwIfProductNotFound(productId);
    await this.delete(productId);
  }

  async buyProduct(productId: number, amount: number): Promise<void> {
    await this.decreaseAmount(productId, amount);
  }

  async unbuyProduct(productId: number, amount: number): Promise<void> {
    await this.increaseAmount(productId, amount);
  }

  async throwIfProductNotFound(productId: number): Promise<Product> {
    const product = await this.findProductById(productId);
    if (!product) {
      throw new NotFoundException(ProductError.NOT_FOUND);
    }
    return product;
  }

  async throwIfNotProductOwner(
    productId: number,
    userId: number,
  ): Promise<Product> {
    const product = await this.throwIfProductNotFound(productId);
    const isCardUser = await this.cardsService.isCardUser(
      product.shop.cardId,
      userId,
    );
    if (!isCardUser) {
      throw new ForbiddenException(ProductError.NOT_OWNER);
    }
    return product;
  }

  async throwIfNotEnoughAmount(
    productId: number,
    amount: number,
  ): Promise<Product> {
    const product = await this.throwIfProductNotFound(productId);
    if (product.amount < amount) {
      throw new BadRequestException(ProductError.NOT_ENOUGH_AMOUNT);
    }
    return product;
  }

  async throwIfProductBought(productId: number): Promise<void> {
    const isProductPurchase =
      await this.purchasesService.isProductPurchase(productId);
    if (isProductPurchase) {
      throw new BadRequestException(ProductError.ALREADY_BOUGHT);
    }
  }

  async throwIfProductNotBought(productId: number): Promise<void> {
    const isProductPurchase =
      await this.purchasesService.isProductPurchase(productId);
    if (!isProductPurchase) {
      throw new BadRequestException(ProductError.NOT_BOUGHT);
    }
  }

  private findProductById(id: number): Promise<Product | null> {
    return this.productsRepository.findOne({
      relations: { shop: true },
      where: { id },
    });
  }

  private async create(dto: CreateProductWithUserDto): Promise<Product> {
    try {
      const product = this.productsRepository.create({
        shopId: dto.shopId,
        userId: dto.userId,
        item: dto.item,
        description: dto.description,
        amount: dto.amount,
        batch: dto.batch,
        unit: dto.unit,
        price: dto.price,
        updatedAt: new Date(),
      });
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException(ProductError.CREATE_FAILED);
    }
  }

  private async editAmountAndPrice(
    id: number,
    dto: EditProductAmountAndPriceDto,
  ): Promise<void> {
    try {
      await this.productsRepository.update(
        { id },
        { amount: dto.amount, price: dto.price, updatedAt: new Date() },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        ProductError.EDIT_AMOUNT_AND_PRICE_FAILED,
      );
    }
  }

  private async edit(id: number, dto: EditProductDto): Promise<void> {
    try {
      await this.productsRepository.update(
        { id },
        {
          item: dto.item,
          description: dto.description,
          amount: dto.amount,
          batch: dto.batch,
          unit: dto.unit,
          price: dto.price,
          updatedAt: new Date(),
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(ProductError.EDIT_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.productsRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(ProductError.DELETE_FAILED);
    }
  }

  private async increaseAmount(id: number, amount: number): Promise<void> {
    try {
      await this.productsRepository.increment({ id }, 'amount', amount);
    } catch (error) {
      throw new InternalServerErrorException(
        ProductError.INCREASE_AMOUNT_FAILED,
      );
    }
  }

  private async decreaseAmount(id: number, amount: number): Promise<void> {
    try {
      await this.productsRepository.decrement({ id }, 'amount', amount);
    } catch (error) {
      throw new InternalServerErrorException(
        ProductError.DECREASE_AMOUNT_FAILED,
      );
    }
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
        'product.updatedAt',
      ])
      .innerJoin('product.shop', 'shop')
      .addSelect(['shop.id', 'shop.name', 'shop.x', 'shop.y'])
      .innerJoin('shop.card', 'sellerCard')
      .addSelect(['sellerCard.id', 'sellerCard.name'])
      .innerJoin('product.user', 'sellerUser')
      .addSelect(['sellerUser.id', 'sellerUser.nick', 'sellerUser.avatar'])
      .loadRelationCountAndMap('product.purchases', 'product.purchases')
      .where(
        new Brackets(
          (qb) => req.id && qb.where('product.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb.where('product.userId = :userId', { userId: req.user }),
        ),
      )
      .skip(req.skip)
      .take(req.take);
  }
}
