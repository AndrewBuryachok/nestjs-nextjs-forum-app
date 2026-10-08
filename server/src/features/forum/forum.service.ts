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

  selectOneUser(nick: string): Promise<User> {
    return this.usersService.selectOneUserByNick(nick);
  }

  getMyCards(myId: number, req: Request): Promise<Response<Card>> {
    return this.cardsService.getMyCards(myId, req);
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
}
