import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async getMyTransactions(
    myId: number,
    req: Request,
  ): Promise<Response<Transaction>> {
    const [data, total] = await this.getTransactionsQueryBuilder(req)
      .leftJoin('senderCard.cardUsers', 'senderCardUsers')
      .leftJoin('receiverCard.cardUsers', 'receiverCardUsers')
      .where(
        new Brackets((qb) =>
          qb
            .where('senderCardUsers.userId = :myId')
            .orWhere('receiverCardUsers.userId = :myId'),
        ),
        { myId },
      )
      .getManyAndCount();
    return { data, total };
  }

  async getAllTransactions(req: Request): Promise<Response<Transaction>> {
    const [data, total] =
      await this.getTransactionsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  private getTransactionsQueryBuilder(
    req: Request,
  ): SelectQueryBuilder<Transaction> {
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
      .leftJoin('transaction.senderUser', 'senderUser')
      .addSelect(['senderUser.id', 'senderUser.nick', 'senderUser.avatar'])
      .leftJoin('transaction.senderCard', 'senderCard')
      .addSelect(['senderCard.id', 'senderCard.name'])
      .leftJoin('transaction.receiverUser', 'receiverUser')
      .addSelect([
        'receiverUser.id',
        'receiverUser.nick',
        'receiverUser.avatar',
      ])
      .leftJoin('transaction.receiverCard', 'receiverCard')
      .addSelect(['receiverCard.id', 'receiverCard.name'])
      .orderBy('transaction.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
