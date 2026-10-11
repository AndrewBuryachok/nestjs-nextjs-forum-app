import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  IsNull,
  MoreThan,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Product } from './product.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { CardsService } from '../cards/cards.service';
import { ShopsService } from '../shops/shops.service';
import { RentsService } from '../rents/rents.service';
import {
  CreateProductWithRentAndUserDto,
  CreateProductWithShopAndUserDto,
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
    private rentsService: RentsService,
  ) {}

  async getMainProducts(req: Request): Promise<Response<Product>> {
    const [data, total] =
      await this.getProductsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyProducts(myId: number, req: Request): Promise<Response<Product>> {
    const [data, total] = await this.getProductsQueryBuilder(req)
      .innerJoin('sellerCard.cardUsers', 'sellerCardUsers')
      .andWhere('sellerCardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllProducts(req: Request): Promise<Response<Product>> {
    const [data, total] =
      await this.getProductsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createShopProduct(dto: CreateProductWithShopAndUserDto): Promise<void> {
    const shop = await this.shopsService.throwIfNotShopOwner(
      dto.shopId,
      dto.userId,
    );
    const product = await this.createShop(dto, shop.cardId);
    this.publishCreateProductNotification(dto.userId, product.id);
  }

  async createRentProduct(dto: CreateProductWithRentAndUserDto): Promise<void> {
    const rent = await this.rentsService.throwIfNotRentUser(
      dto.rentId,
      dto.userId,
    );
    const product = await this.createRent(dto, rent.cardId);
    this.publishCreateProductNotification(dto.userId, product.id);
  }

  private publishCreateProductNotification(
    userId: number,
    productId: number,
  ): void {
    this.mqttService.publishNotification(
      userId,
      0,
      productId,
      Notification.CREATE_PRODUCT,
    );
  }

  async editMyProduct(
    myId: number,
    productId: number,
    dto: EditProductDto,
  ): Promise<void> {
    await this.throwIfNotProductOwner(productId, myId);
    await this.edit(productId, dto);
  }

  async editUserProduct(productId: number, dto: EditProductDto): Promise<void> {
    await this.throwIfProductNotFound(productId);
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
      product.cardId,
      userId,
    );
    if (!isCardUser) {
      throw new ForbiddenException(ProductError.NOT_OWNER);
    }
    return product;
  }

  private findProductById(id: number): Promise<Product | null> {
    return this.productsRepository.findOneBy([
      { id, rent: { completedAt: IsNull() } },
      { id, rent: { completedAt: MoreThan(new Date()) } },
    ]);
  }

  private async createShop(
    dto: CreateProductWithShopAndUserDto,
    cardId: number,
  ): Promise<Product> {
    try {
      const product = this.productsRepository.create({
        shopId: dto.shopId,
        userId: dto.userId,
        cardId,
        item: dto.item,
        description: dto.description,
        amount: dto.amount,
        unit: dto.unit,
        price: dto.price,
      });
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException(ProductError.CREATE_SHOP_FAILED);
    }
  }

  private async createRent(
    dto: CreateProductWithRentAndUserDto,
    cardId: number,
  ): Promise<Product> {
    try {
      const product = this.productsRepository.create({
        rentId: dto.rentId,
        userId: dto.userId,
        cardId,
        item: dto.item,
        description: dto.description,
        amount: dto.amount,
        unit: dto.unit,
        price: dto.price,
      });
      await this.productsRepository.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException(ProductError.CREATE_RENT_FAILED);
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
          unit: dto.unit,
          price: dto.price,
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

  private getProductsQueryBuilder(req: Request): SelectQueryBuilder<Product> {
    return this.productsRepository
      .createQueryBuilder('product')
      .select([
        'product.id',
        'product.item',
        'product.description',
        'product.amount',
        'product.unit',
        'product.price',
        'product.createdAt',
      ])
      .leftJoin('product.shop', 'shop')
      .addSelect(['shop.id', 'shop.name', 'shop.world', 'shop.x', 'shop.y'])
      .leftJoin('product.rent', 'rent')
      .addSelect(['rent.id'])
      .leftJoin('rent.plot', 'plot')
      .addSelect(['plot.id', 'plot.name', 'plot.world', 'plot.x', 'plot.y'])
      .innerJoin('product.user', 'sellerUser')
      .addSelect(['sellerUser.id', 'sellerUser.nick', 'sellerUser.avatar'])
      .innerJoin('product.card', 'sellerCard')
      .addSelect(['sellerCard.id', 'sellerCard.name'])
      .where(
        new Brackets((qb) =>
          qb
            .where('rent.completedAt IS NULL')
            .orWhere('rent.completedAt > NOW()'),
        ),
      )
      .andWhere(
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
      .orderBy('product.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
