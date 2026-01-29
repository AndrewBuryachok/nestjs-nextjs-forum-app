import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Card } from './card.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
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
