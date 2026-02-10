import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto, CreateTransferDto } from './transaction.dto';
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
    return this.transactionsService.createDepositTransaction({
      ...dto,
      myId: 1,
    });
  }

  @Post('withdraw')
  createWithdrawTransaction(@Body() dto: CreateTransactionDto): Promise<void> {
    return this.transactionsService.createWithdrawTransaction({
      ...dto,
      myId: 1,
    });
  }

  @Post('transfer')
  createMyTransferTransaction(@Body() dto: CreateTransferDto): Promise<void> {
    return this.transactionsService.createTransferTransaction({
      ...dto,
      myId: 1,
      isAll: false,
    });
  }

  @Post('transfer/all')
  createUserTransferTransaction(@Body() dto: CreateTransferDto): Promise<void> {
    return this.transactionsService.createTransferTransaction({
      ...dto,
      myId: 1,
      isAll: true,
    });
  }
}
