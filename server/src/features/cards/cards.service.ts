import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Card } from './card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  getMyCards(myId: number): Promise<Card[]> {
    return this.getCardsQueryBuilder()
      .where('card.userId = :myId', { myId })
      .getMany();
  }

  getAllCards(): Promise<Card[]> {
    return this.getCardsQueryBuilder()
      .where('card.userId = account.userId')
      .getMany();
  }

  private getCardsQueryBuilder(): SelectQueryBuilder<Card> {
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
      .orderBy('card.id', 'DESC');
  }
}
