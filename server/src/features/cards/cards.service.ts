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
      .where('card.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllCards(req: Request): Promise<Response<Card>> {
    const [data, total] = await this.getCardsQueryBuilder(req)
      .where('card.userId = account.userId')
      .getManyAndCount();
    return { data, total };
  }

  selectUserCards(userId: number): Promise<Card[]> {
    return this.selectCardsQueryBuilder(userId).getMany();
  }

  selectUserCardsWithBalance(userId: number): Promise<Card[]> {
    return this.selectCardsQueryBuilder(userId)
      .addSelect(['account.balance'])
      .getMany();
  }

  private selectCardsQueryBuilder(userId: number): SelectQueryBuilder<Card> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .select(['card.id'])
      .innerJoin('card.account', 'account')
      .addSelect(['account.id', 'account.name'])
      .innerJoin('account.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .where('card.userId = :userId', { userId })
      .orderBy('account.name', 'ASC');
  }

  private getCardsQueryBuilder(req: Request): SelectQueryBuilder<Card> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .select(['card.id'])
      .innerJoin('card.account', 'account')
      .addSelect([
        'account.id',
        'account.name',
        'account.balance',
        'account.createdAt',
      ])
      .innerJoin('account.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .orderBy('card.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
