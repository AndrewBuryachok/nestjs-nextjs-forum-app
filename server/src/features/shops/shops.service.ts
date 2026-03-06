import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Shop } from './shop.entity';
import { CardsService } from '../cards/cards.service';
import { DeleteShopDto, ExtCreateShopDto, ExtEditShopDto } from './shop.dto';
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
      .innerJoin('ownerAccount.cards', 'ownerCards')
      .where('ownerCards.userId = :myId', { myId })
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
      .innerJoin('ownerCard.account', 'ownerAccount')
      .innerJoin('ownerAccount.cards', 'ownerCards')
      .where('ownerCards.userId = :userId', { userId })
      .getMany();
  }

  async createShop(dto: ExtCreateShopDto): Promise<void> {
    await this.cardsService.throwIfNotCardUser(dto.cardId, dto.myId, dto.isAll);
    await this.create(dto);
  }

  async editShop(dto: ExtEditShopDto): Promise<void> {
    await this.throwIfNotShopOwner(dto.shopId, dto.myId, dto.isAll);
    await this.edit(dto.shopId, dto);
  }

  async deleteShop(dto: DeleteShopDto): Promise<void> {
    await this.throwIfNotShopOwner(dto.shopId, dto.myId, dto.isAll);
    await this.delete(dto.shopId);
  }

  async throwIfShopNotFound(shopId: number): Promise<Shop> {
    const shop = await this.findShopById(shopId);
    if (!shop) {
      throw new NotFoundException(ShopError.NOT_FOUND);
    }
    return shop;
  }

  async throwIfNotShopOwner(
    shopId: number,
    userId: number,
    isAll: boolean,
  ): Promise<Shop> {
    const shop = await this.throwIfShopNotFound(shopId);
    const isCardUser = await this.cardsService.isCardUser(
      shop.cardId,
      userId,
      isAll,
    );
    if (!isCardUser) {
      throw new ForbiddenException(ShopError.NOT_OWNER);
    }
    return shop;
  }

  private findShopById(id: number): Promise<Shop | null> {
    return this.shopsRepository.findOneBy({ id });
  }

  private async create(dto: ExtCreateShopDto): Promise<Shop> {
    try {
      const shop = this.shopsRepository.create({
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

  private async edit(id: number, dto: ExtEditShopDto): Promise<void> {
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
      .innerJoin('shop.card', 'ownerCard')
      .addSelect(['ownerCard.id'])
      .innerJoin('ownerCard.account', 'ownerAccount')
      .addSelect(['ownerAccount.id', 'ownerAccount.name'])
      .innerJoin('ownerCard.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .orderBy('shop.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
