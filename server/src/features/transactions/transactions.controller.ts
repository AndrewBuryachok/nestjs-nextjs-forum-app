import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import {
  CreateTransactionDto,
  CreateTransferDto,
  TransactionIdDto,
} from './transaction.dto';
import { MyId } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('my')
  getMyTransactions(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Transaction>> {
    return this.transactionsService.getMyTransactions(myId, req);
  }

  @Get('all')
  getAllTransactions(@Query() req: Request): Promise<Response<Transaction>> {
    return this.transactionsService.getAllTransactions(req);
  }

  @Post('deposit')
  createDepositTransaction(
    @MyId() myId: number,
    @Body() dto: CreateTransactionDto,
  ): Promise<void> {
    return this.transactionsService.createDepositTransaction({ ...dto, myId });
  }

  @Post('withdraw')
  createWithdrawTransaction(
    @MyId() myId: number,
    @Body() dto: CreateTransactionDto,
  ): Promise<void> {
    return this.transactionsService.createWithdrawTransaction({ ...dto, myId });
  }

  @Post('transfer')
  createMyTransferTransaction(
    @MyId() myId: number,
    @Body() dto: CreateTransferDto,
  ): Promise<void> {
    return this.transactionsService.createTransferTransaction({
      ...dto,
      myId,
      isAll: false,
    });
  }

  @Post('transfer/all')
  createUserTransferTransaction(
    @MyId() myId: number,
    @Body() dto: CreateTransferDto,
  ): Promise<void> {
    return this.transactionsService.createTransferTransaction({
      ...dto,
      myId,
      isAll: true,
    });
  }

  @Delete(':transactionId')
  deleteTransaction(
    @Param() { transactionId }: TransactionIdDto,
  ): Promise<void> {
    return this.transactionsService.deleteTransaction({ transactionId });
  }
}
