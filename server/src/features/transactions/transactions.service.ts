import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Transaction } from './transaction.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { CardsService } from '../cards/cards.service';
import {
  CreateTransactionDto,
  CreateTransactionWithTypeAndDescriptionDto,
  CreateTransferWithUserAndTypeDto,
} from './transaction.dto';
import { TransactionError } from './transaction-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification, TransactionType } from '../../common/enums';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private mqttService: MqttService,
    private cardsService: CardsService,
  ) {}

  async getMyTransactions(
    myId: number,
    req: Request,
  ): Promise<Response<Transaction>> {
    const [data, total] = await this.getTransactionsQueryBuilder(req)
      .leftJoin('senderCard.cardUsers', 'senderCardUsers')
      .leftJoin('receiverCard.cardUsers', 'receiverCardUsers')
      .andWhere(
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
      { ...dto, type: TransactionType.DEPOSIT, description: '' },
      myId,
    );
  }

  async createWithdrawTransaction(
    myId: number,
    dto: CreateTransactionDto,
  ): Promise<void> {
    await this.createDecreaseTransaction(
      { ...dto, type: TransactionType.WITHDRAW, description: '' },
      myId,
    );
  }

  @Transactional()
  async createTransferTransaction(
    dto: CreateTransferWithUserAndTypeDto,
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
    const transaction = await this.createTransfer(dto);
    this.mqttService.publishNotification(
      dto.senderUserId,
      dto.receiverUserId,
      transaction.id,
      Notification.TRANSFER_TRANSACTION,
    );
  }

  @Transactional()
  async createIncreaseTransaction(
    dto: CreateTransactionWithTypeAndDescriptionDto,
    executorUserId?: number,
  ): Promise<void> {
    const userId = await this.cardsService.increaseCardBalance(
      dto.cardId,
      dto.userId,
      dto.sum,
    );
    const transaction = await this.createIncrease(dto, executorUserId);
    this.publishCreateTransactionNotification(
      executorUserId ?? dto.userId,
      userId,
      transaction.id,
    );
  }

  @Transactional()
  async createDecreaseTransaction(
    dto: CreateTransactionWithTypeAndDescriptionDto,
    executorUserId?: number,
  ): Promise<void> {
    const userId = await this.cardsService.decreaseCardBalance(
      dto.cardId,
      dto.userId,
      dto.sum,
    );
    const transaction = await this.createDecrease(dto, executorUserId);
    this.publishCreateTransactionNotification(
      executorUserId ?? dto.userId,
      userId,
      transaction.id,
    );
  }

  private publishCreateTransactionNotification(
    fromUserId: number,
    toUserId: number,
    id: number,
  ): void {
    this.mqttService.publishNotification(
      fromUserId,
      toUserId,
      id,
      Notification.CREATE_TRANSACTION,
    );
  }

  @Transactional()
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
    dto: CreateTransactionWithTypeAndDescriptionDto,
    executorUserId?: number,
  ): Promise<Transaction> {
    try {
      const transaction = this.transactionsRepository.create({
        executorUserId,
        receiverUserId: dto.userId,
        receiverCardId: dto.cardId,
        type: dto.type,
        sum: dto.sum,
        description: dto.description,
        item: dto.item,
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
    dto: CreateTransactionWithTypeAndDescriptionDto,
    executorUserId?: number,
  ): Promise<Transaction> {
    try {
      const transaction = this.transactionsRepository.create({
        executorUserId,
        senderUserId: dto.userId,
        senderCardId: dto.cardId,
        type: dto.type,
        sum: dto.sum,
        description: dto.description,
        item: dto.item,
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
    dto: CreateTransferWithUserAndTypeDto,
  ): Promise<Transaction> {
    try {
      const transaction = this.transactionsRepository.create({
        senderUserId: dto.senderUserId,
        senderCardId: dto.senderCardId,
        receiverUserId: dto.receiverUserId,
        receiverCardId: dto.receiverCardId,
        type: dto.type,
        sum: dto.sum,
        description: dto.description,
        item: dto.item,
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
        'transaction.type',
        'transaction.sum',
        'transaction.description',
        'transaction.item',
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
      .where(
        new Brackets(
          (qb) => req.id && qb.where('transaction.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb
              .where('transaction.executorUserId = :userId')
              .orWhere('transaction.senderUserId = :userId')
              .orWhere('transaction.receiverUserId = :userId'),
        ),
        { userId: req.user },
      )
      .orderBy('transaction.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
