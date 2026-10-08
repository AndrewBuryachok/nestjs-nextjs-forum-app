import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CardsService } from '../cards/cards.service';
import { TransactionsService } from '../transactions/transactions.service';
import { FinesService } from '../fines/fines.service';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Fine } from '../fines/fine.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class ForumService {
  constructor(
    private usersService: UsersService,
    private cardsService: CardsService,
    private transactionsService: TransactionsService,
    private finesService: FinesService,
  ) {}

  async selectOneUser(nick: string): Promise<User> {
    try {
      const user = await this.usersService.selectOneUserByNick(nick);
      return user;
    } catch (error) {
      await this.usersService.createUser({ nick, password: '' });
      return this.usersService.selectOneUserByNick(nick);
    }
  }

  selectAllUsers(): Promise<User[]> {
    return this.usersService.selectAllUsers();
  }

  getMyCards(myId: number, req: Request): Promise<Response<Card>> {
    return this.cardsService.getMyCards(myId, req);
  }

  selectMyCards(myId: number): Promise<Card[]> {
    return this.cardsService.selectUserCardsWithBalance(myId);
  }

  selectUserCards(userId: number): Promise<Card[]> {
    return this.cardsService.selectUserCards(userId);
  }

  selectCardUsers(cardId: number): Promise<User[]> {
    return this.cardsService.selectCardUsers(cardId);
  }

  selectNotCardUsers(cardId: number): Promise<User[]> {
    return this.cardsService.selectNotCardUsers(cardId);
  }

  getMyTransactions(
    myId: number,
    req: Request,
  ): Promise<Response<Transaction>> {
    return this.transactionsService.getMyTransactions(myId, req);
  }

  getMyFines(myId: number, req: Request): Promise<Response<Fine>> {
    return this.finesService.getMyFines(myId, req);
  }

  getPaidFines(myId: number, req: Request): Promise<Response<Fine>> {
    return this.finesService.getPaidFines(myId, req);
  }
}
