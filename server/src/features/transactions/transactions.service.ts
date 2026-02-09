import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CardsService } from '../cards/cards.service';
import {
  ExtCreateTransactionDto,
  ExtCreateTransactionWithDescriptionDto,
} from './transaction.dto';
import { TransactionError } from './transaction-errors.enum';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private cardsService: CardsService,
  ) {}

  async getMyTransactions(
    myId: number,
    req: Request,
  ): Promise<Response<Transaction>> {
    const [data, total] = await this.getTransactionsQueryBuilder(req)
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
      .getManyAndCount();
    return { data, total };
  }

  async getAllTransactions(req: Request): Promise<Response<Transaction>> {
    const [data, total] =
      await this.getTransactionsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createDepositTransaction(dto: ExtCreateTransactionDto): Promise<void> {
    await this.createIncreaseTransaction({
      ...dto,
      description: 'поповнення карти',
    });
  }

  async createWithdrawTransaction(dto: ExtCreateTransactionDto): Promise<void> {
    await this.createDecreaseTransaction({
      ...dto,
      description: 'зняття готівки',
    });
  }

  async createIncreaseTransaction(
    dto: ExtCreateTransactionWithDescriptionDto,
  ): Promise<void> {
    await this.cardsService.increaseCardBalance(dto);
    await this.createIncrease(dto);
  }

  async createDecreaseTransaction(
    dto: ExtCreateTransactionWithDescriptionDto,
  ): Promise<void> {
    await this.cardsService.decreaseCardBalance(dto);
    await this.createDecrease(dto);
  }

  private async createIncrease(
    dto: ExtCreateTransactionWithDescriptionDto,
  ): Promise<Transaction> {
    try {
      const transaction = this.transactionsRepository.create({
        executorUserId: dto.myId,
        receiverCardId: dto.cardId,
        sum: dto.sum,
        description: dto.description,
      });
      await this.transactionsRepository.save(transaction);
      return transaction;
    } catch (error) {
      throw new InternalServerErrorException(
        TransactionError.CREATE_INCREASE_FAILED,
      );
    }
  }

  private async createDecrease(
    dto: ExtCreateTransactionWithDescriptionDto,
  ): Promise<Transaction> {
    try {
      const transaction = this.transactionsRepository.create({
        executorUserId: dto.myId,
        senderCardId: dto.cardId,
        sum: dto.sum,
        description: dto.description,
      });
      await this.transactionsRepository.save(transaction);
      return transaction;
    } catch (error) {
      throw new InternalServerErrorException(
        TransactionError.CREATE_DECREASE_FAILED,
      );
    }
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
      .orderBy('transaction.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
