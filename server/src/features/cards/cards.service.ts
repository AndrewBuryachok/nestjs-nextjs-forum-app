import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Account } from './account.entity';
import { Card } from './card.entity';
import { ExtCreateCardDto } from './card.dto';
import { CardError } from './card-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
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

  async createCard(dto: ExtCreateCardDto): Promise<void> {
    await this.create(dto);
  }

  private async create(dto: ExtCreateCardDto): Promise<Card> {
    try {
      const account = this.accountsRepository.create({
        userId: dto.userId,
        name: dto.name,
      });
      await this.accountsRepository.save(account);
      const card = this.cardsRepository.create({
        accountId: account.id,
        userId: dto.userId,
      });
      await this.cardsRepository.save(card);
      return card;
    } catch (error) {
      throw new InternalServerErrorException(CardError.CREATE_FAILED);
    }
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
