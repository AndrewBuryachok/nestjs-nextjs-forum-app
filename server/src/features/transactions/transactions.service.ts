import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  getMyTransactions(myId: number): Promise<Transaction[]> {
    return this.getTransactionsQueryBuilder()
      .leftJoin('senderAccount.cards', 'senderCards')
      .leftJoin('receiverAccount.cards', 'receiverCards')
      .where(
        new Brackets((qb) =>
          qb
            .where('senderCards.userId = :myId')
            .orWhere('receiverCards.userId = :myId'),
        ),
        { myId },
      )
      .getMany();
  }

  getAllTransactions(): Promise<Transaction[]> {
    return this.getTransactionsQueryBuilder().getMany();
  }

  private getTransactionsQueryBuilder(): SelectQueryBuilder<Transaction> {
    return this.transactionsRepository
      .createQueryBuilder('transaction')
      .select([
        'transaction.id',
        'transaction.sum',
        'transaction.description',
        'transaction.createdAt',
      ])
      .leftJoin('transaction.executorUser', 'executorUser')
      .addSelect([
        'executorUser.id',
        'executorUser.nick',
        'executorUser.avatar',
      ])
      .leftJoin('transaction.senderCard', 'senderCard')
      .addSelect(['senderCard.id'])
      .leftJoin('senderCard.account', 'senderAccount')
      .addSelect(['senderAccount.id', 'senderAccount.name'])
      .leftJoin('senderCard.user', 'senderUser')
      .addSelect(['senderUser.id', 'senderUser.nick', 'senderUser.avatar'])
      .leftJoin('transaction.receiverCard', 'receiverCard')
      .addSelect(['receiverCard.id'])
      .leftJoin('receiverCard.account', 'receiverAccount')
      .addSelect(['receiverAccount.id', 'receiverAccount.name'])
      .leftJoin('receiverCard.user', 'receiverUser')
      .addSelect([
        'receiverUser.id',
        'receiverUser.nick',
        'receiverUser.avatar',
      ])
      .orderBy('transaction.id', 'DESC');
  }
}
