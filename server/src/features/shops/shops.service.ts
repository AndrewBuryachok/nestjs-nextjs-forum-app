import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Shop } from './shop.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { CardsService } from '../cards/cards.service';
import { CreateShopWithUserDto, EditShopDto } from './shop.dto';
import { ShopError } from './shop-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private shopsRepository: Repository<Shop>,
    private mqttService: MqttService,
    private cardsService: CardsService,
  ) {}

  async getMainShops(req: Request): Promise<Response<Shop>> {
    const [data, total] =
      await this.getShopsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyShops(myId: number, req: Request): Promise<Response<Shop>> {
    const [data, total] = await this.getShopsQueryBuilder(req)
      .innerJoin('ownerCard.cardUsers', 'ownerCardUsers')
      .andWhere('ownerCardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllShops(req: Request): Promise<Response<Shop>> {
    const [data, total] =
      await this.getShopsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  selectUserShops(userId: number): Promise<Shop[]> {
    return this.selectShopsQueryBuilder()
      .innerJoin('shop.card', 'ownerCard')
      .innerJoin('ownerCard.cardUsers', 'ownerCardUsers')
      .where('ownerCardUsers.userId = :userId', { userId })
      .getMany();
  }

  async createShop(dto: CreateShopWithUserDto): Promise<void> {
    await this.cardsService.throwIfNotCardUser(dto.cardId, dto.userId);
    const shop = await this.create(dto);
    this.mqttService.publishNotification(
      dto.userId,
      0,
      shop.id,
      Notification.CREATE_SHOP,
    );
  }

  async editMyShop(
    myId: number,
    shopId: number,
    dto: EditShopDto,
  ): Promise<void> {
    await this.throwIfNotShopOwner(shopId, myId);
    await this.edit(shopId, dto);
  }

  async editUserShop(shopId: number, dto: EditShopDto): Promise<void> {
    await this.throwIfShopNotFound(shopId);
    await this.edit(shopId, dto);
  }

  async deleteMyShop(myId: number, shopId: number): Promise<void> {
    await this.throwIfNotShopOwner(shopId, myId);
    await this.delete(shopId);
  }

  async deleteUserShop(shopId: number): Promise<void> {
    await this.throwIfShopNotFound(shopId);
    await this.delete(shopId);
  }

  async throwIfShopNotFound(shopId: number): Promise<Shop> {
    const shop = await this.findShopById(shopId);
    if (!shop) {
      throw new NotFoundException(ShopError.NOT_FOUND);
    }
    return shop;
  }

  async throwIfNotShopOwner(shopId: number, userId: number): Promise<Shop> {
    const shop = await this.throwIfShopNotFound(shopId);
    const isCardUser = await this.cardsService.isCardUser(shop.cardId, userId);
    if (!isCardUser) {
      throw new ForbiddenException(ShopError.NOT_OWNER);
    }
    return shop;
  }

  private findShopById(id: number): Promise<Shop | null> {
    return this.shopsRepository.findOneBy({ id });
  }

  private async create(dto: CreateShopWithUserDto): Promise<Shop> {
    try {
      const shop = this.shopsRepository.create({
        userId: dto.userId,
        cardId: dto.cardId,
        name: dto.name,
        x: dto.x,
        y: dto.y,
      });
      await this.shopsRepository.save(shop);
      return shop;
    } catch (error) {
      throw new InternalServerErrorException(ShopError.CREATE_FAILED);
    }
  }

  private async edit(id: number, dto: EditShopDto): Promise<void> {
    try {
      await this.shopsRepository.update(
        { id },
        { name: dto.name, x: dto.x, y: dto.y },
      );
    } catch (error) {
      throw new InternalServerErrorException(ShopError.EDIT_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.shopsRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(ShopError.DELETE_FAILED);
    }
  }

  private selectShopsQueryBuilder(): SelectQueryBuilder<Shop> {
    return this.shopsRepository
      .createQueryBuilder('shop')
      .select(['shop.id', 'shop.name', 'shop.x', 'shop.y'])
      .orderBy('shop.name', 'ASC');
  }

  private getShopsQueryBuilder(req: Request): SelectQueryBuilder<Shop> {
    return this.shopsRepository
      .createQueryBuilder('shop')
      .select(['shop.id', 'shop.name', 'shop.x', 'shop.y', 'shop.createdAt'])
      .innerJoin('shop.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .innerJoin('shop.card', 'ownerCard')
      .addSelect(['ownerCard.id', 'ownerCard.name'])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('shop.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user && qb.where('shop.userId = :userId', { userId: req.user }),
        ),
      )
      .orderBy('shop.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
