import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Card } from './card.entity';
import { CardUser } from './card-user.entity';
import { UsersService } from '../users/users.service';
import { CreateCardWithUserDto } from './card.dto';
import { CardError } from './card-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(CardUser)
    private cardsUsersRepository: Repository<CardUser>,
    private usersService: UsersService,
  ) {}

  async getMyCards(myId: number, req: Request): Promise<Response<Card>> {
    const [data, total] = await this.getCardsQueryBuilder(req)
      .innerJoin('card.cardUsers', 'cardUsers')
      .where('cardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllCards(req: Request): Promise<Response<Card>> {
    const [data, total] =
      await this.getCardsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  selectUserCards(userId: number): Promise<Card[]> {
    return this.selectCardsQueryBuilder(userId).getMany();
  }

  selectUserCardsWithBalance(userId: number): Promise<Card[]> {
    return this.selectCardsQueryBuilder(userId)
      .addSelect(['card.balance'])
      .getMany();
  }

  async createCard(dto: CreateCardWithUserDto): Promise<void> {
    await this.usersService.throwIfUserNotFound(dto.userId);
    await this.create(dto);
  }

  private async create(dto: CreateCardWithUserDto): Promise<Card> {
    try {
      const card = this.cardsRepository.create({
        userId: dto.userId,
        name: dto.name,
      });
      await this.cardsRepository.save(card);
      const cardUser = this.cardsUsersRepository.create({
        cardId: card.id,
        userId: dto.userId,
      });
      await this.cardsUsersRepository.save(cardUser);
      return card;
    } catch (error) {
      throw new InternalServerErrorException(CardError.CREATE_FAILED);
    }
  }

  private selectCardsQueryBuilder(userId: number): SelectQueryBuilder<Card> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .select(['card.id', 'card.name'])
      .innerJoin('card.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .innerJoin('card.cardUsers', 'cardUsers')
      .where('cardUsers.userId = :userId', { userId })
      .orderBy('card.name', 'ASC');
  }

  private getCardsQueryBuilder(req: Request): SelectQueryBuilder<Card> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .select(['card.id', 'card.name', 'card.balance', 'card.createdAt'])
      .innerJoin('card.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .orderBy('card.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
