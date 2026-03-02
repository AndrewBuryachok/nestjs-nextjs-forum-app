import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Shop } from './shop.entity';
import { CardsService } from '../cards/cards.service';
import { CreateShopWithUserDto } from './shop.dto';
import { ShopError } from './shop-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private shopsRepository: Repository<Shop>,
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
      .where('ownerCardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllShops(req: Request): Promise<Response<Shop>> {
    const [data, total] =
      await this.getShopsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createShop(dto: CreateShopWithUserDto): Promise<void> {
    await this.cardsService.throwIfNotCardUser(dto.cardId, dto.userId);
    await this.create(dto);
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

  private getShopsQueryBuilder(req: Request): SelectQueryBuilder<Shop> {
    return this.shopsRepository
      .createQueryBuilder('shop')
      .select(['shop.id', 'shop.name', 'shop.x', 'shop.y', 'shop.createdAt'])
      .innerJoin('shop.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .innerJoin('shop.card', 'ownerCard')
      .addSelect(['ownerCard.id', 'ownerCard.name'])
      .orderBy('shop.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
