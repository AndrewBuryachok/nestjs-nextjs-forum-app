import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Transaction } from './transaction.entity';
import { CardsService } from '../cards/cards.service';
import {
  DeleteTransactionDto,
  ExtCreateTransactionDto,
  ExtCreateTransactionWithDescriptionDto,
  ExtCreateTransferDto,
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

  @Transactional()
  async createTransferTransaction(dto: ExtCreateTransferDto): Promise<void> {
    await this.cardsService.throwIfNotCardUser(
      dto.senderCardId,
      dto.myId,
      dto.isAll,
    );
    await this.cardsService.decreaseCardBalance({
      cardId: dto.senderCardId,
      sum: dto.sum,
    });
    await this.cardsService.increaseCardBalance({
      cardId: dto.receiverCardId,
      sum: dto.sum,
    });
    await this.createTransfer(dto);
  }

  @Transactional()
  async createIncreaseTransaction(
    dto: ExtCreateTransactionWithDescriptionDto,
  ): Promise<void> {
    await this.cardsService.increaseCardBalance(dto);
    await this.createIncrease(dto);
  }

  @Transactional()
  async createDecreaseTransaction(
    dto: ExtCreateTransactionWithDescriptionDto,
  ): Promise<void> {
    await this.cardsService.decreaseCardBalance(dto);
    await this.createDecrease(dto);
  }

  @Transactional()
  async deleteTransaction(dto: DeleteTransactionDto): Promise<void> {
    const transaction = await this.throwIfTransactionNotFound(
      dto.transactionId,
    );
    if (transaction.receiverCardId) {
      await this.cardsService.decreaseCardBalance({
        cardId: transaction.receiverCardId,
        sum: transaction.sum,
      });
    }
    if (transaction.senderCardId) {
      await this.cardsService.increaseCardBalance({
        cardId: transaction.senderCardId,
        sum: transaction.sum,
      });
    }
    await this.delete(transaction.id);
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

  private async createTransfer(
    dto: ExtCreateTransferDto,
  ): Promise<Transaction> {
    try {
      const transaction = this.transactionsRepository.create({
        senderCardId: dto.senderCardId,
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
