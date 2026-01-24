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
      .innerJoin('card.cardUsers', 'cardUsers')
      .where('cardUsers.userId = :myId', { myId })
      .getMany();
  }

  getAllCards(): Promise<Card[]> {
    return this.getCardsQueryBuilder().getMany();
  }

  private getCardsQueryBuilder(): SelectQueryBuilder<Card> {
    return this.cardsRepository
      .createQueryBuilder('card')
      .select(['card.id', 'card.name', 'card.balance', 'card.createdAt'])
      .innerJoin('card.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .orderBy('card.id', 'DESC');
  }
}
