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
  CreateTransferWithUserDto,
  TransactionIdDto,
} from './transaction.dto';
import { Request, Response } from '../../common/interfaces';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('my')
  getMyTransactions(@Query() req: Request): Promise<Response<Transaction>> {
    return this.transactionsService.getMyTransactions(1, req);
  }

  @Get('all')
  getAllTransactions(@Query() req: Request): Promise<Response<Transaction>> {
    return this.transactionsService.getAllTransactions(req);
  }

  @Post('deposit')
  createDepositTransaction(@Body() dto: CreateTransactionDto): Promise<void> {
    return this.transactionsService.createDepositTransaction(1, dto);
  }

  @Post('withdraw')
  createWithdrawTransaction(@Body() dto: CreateTransactionDto): Promise<void> {
    return this.transactionsService.createWithdrawTransaction(1, dto);
  }

  @Post('transfer')
  createMyTransferTransaction(@Body() dto: CreateTransferDto): Promise<void> {
    return this.transactionsService.createMyTransferTransaction(1, dto);
  }

  @Post('transfer/all')
  createUserTransferTransaction(
    @Body() dto: CreateTransferWithUserDto,
  ): Promise<void> {
    return this.transactionsService.createUserTransferTransaction(dto);
  }

  @Delete(':transactionId')
  deleteTransaction(
    @Param() { transactionId }: TransactionIdDto,
  ): Promise<void> {
    return this.transactionsService.deleteTransaction(transactionId);
  }
}
