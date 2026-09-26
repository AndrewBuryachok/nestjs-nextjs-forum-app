import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './rent.entity';
import { CardsModule } from '../cards/cards.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { PlotsModule } from '../plots/plots.module';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rent]),
    CardsModule,
    TransactionsModule,
    PlotsModule,
  ],
  controllers: [RentsController],
  providers: [RentsService],
  exports: [RentsService],
})
export class RentsModule {}
