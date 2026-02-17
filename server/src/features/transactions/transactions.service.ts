import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CardsService } from '../cards/cards.service';
import {
  CreateTransactionDto,
  CreateTransactionWithDescriptionDto,
  CreateTransferDto,
  CreateTransferWithUserDto,
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

  async createDepositTransaction(
    myId: number,
    dto: CreateTransactionDto,
  ): Promise<void> {
    await this.createIncreaseTransaction(
      { ...dto, description: 'поповнення карти' },
      myId,
    );
  }

  async createWithdrawTransaction(
    myId: number,
    dto: CreateTransactionDto,
  ): Promise<void> {
    await this.createDecreaseTransaction(
      { ...dto, description: 'зняття готівки' },
      myId,
    );
  }

  async createMyTransferTransaction(
    myId: number,
    dto: CreateTransferDto,
  ): Promise<void> {
    await this.createTransferTransaction({ ...dto, senderUserId: myId });
  }

  async createUserTransferTransaction(
    dto: CreateTransferWithUserDto,
  ): Promise<void> {
    await this.createTransferTransaction(dto);
  }

  private async createTransferTransaction(
    dto: CreateTransferWithUserDto,
  ): Promise<void> {
    await this.cardsService.decreaseCardBalance(
      dto.senderCardId,
      dto.senderUserId,
      dto.sum,
    );
    await this.cardsService.increaseCardBalance(
      dto.receiverCardId,
      dto.receiverUserId,
      dto.sum,
    );
    await this.createTransfer(dto);
  }

  async createIncreaseTransaction(
    dto: CreateTransactionWithDescriptionDto,
    executorUserId?: number,
  ): Promise<void> {
    await this.cardsService.increaseCardBalance(
      dto.cardId,
      dto.userId,
      dto.sum,
    );
    await this.createIncrease(dto, executorUserId);
  }

  async createDecreaseTransaction(
    dto: CreateTransactionWithDescriptionDto,
    executorUserId?: number,
  ): Promise<void> {
    await this.cardsService.decreaseCardBalance(
      dto.cardId,
      dto.userId,
      dto.sum,
    );
    await this.createDecrease(dto, executorUserId);
  }

  async deleteTransaction(transactionId: number): Promise<void> {
    const transaction = await this.throwIfTransactionNotFound(transactionId);
    if (transaction.receiverUserId && transaction.receiverCardId) {
      await this.cardsService.decreaseCardBalance(
        transaction.receiverCardId,
        transaction.receiverUserId,
        transaction.sum,
      );
    }
    if (transaction.senderUserId && transaction.senderCardId) {
      await this.cardsService.increaseCardBalance(
        transaction.senderCardId,
        transaction.senderUserId,
        transaction.sum,
      );
    }
    await this.delete(transactionId);
  }

  async throwIfTransactionNotFound(
    transactionId: number,
  ): Promise<Transaction> {
    const transaction = await this.findTransactionById(transactionId);
    if (!transaction) {
      throw new NotFoundException(TransactionError.NOT_FOUND);
    }
    return transaction;
  }

  private findTransactionById(id: number): Promise<Transaction | null> {
    return this.transactionsRepository.findOneBy({ id });
  }

  private async createIncrease(
    dto: CreateTransactionWithDescriptionDto,
    executorUserId?: number,
  ): Promise<Transaction> {
    try {
      const transaction = this.transactionsRepository.create({
        executorUserId,
        receiverUserId: dto.userId,
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
    dto: CreateTransactionWithDescriptionDto,
    executorUserId?: number,
  ): Promise<Transaction> {
    try {
      const transaction = this.transactionsRepository.create({
        executorUserId,
        senderUserId: dto.userId,
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

  private async createTransfer(
    dto: CreateTransferWithUserDto,
  ): Promise<Transaction> {
    try {
      const transaction = this.transactionsRepository.create({
        senderUserId: dto.senderUserId,
        senderCardId: dto.senderCardId,
        receiverUserId: dto.receiverUserId,
        receiverCardId: dto.receiverCardId,
        sum: dto.sum,
        description: dto.description,
      });
      await this.transactionsRepository.save(transaction);
      return transaction;
    } catch (error) {
      throw new InternalServerErrorException(
        TransactionError.CREATE_TRANSFER_FAILED,
      );
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.transactionsRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException(TransactionError.DELETE_FAILED);
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
