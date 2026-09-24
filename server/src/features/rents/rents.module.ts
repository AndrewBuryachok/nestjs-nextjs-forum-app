import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './rent.entity';
import { TransactionsModule } from '../transactions/transactions.module';
import { PlotsModule } from '../plots/plots.module';
import { RentsController } from './rents.controller';
import { RentsService } from './rents.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rent]), TransactionsModule, PlotsModule],
  controllers: [RentsController],
  providers: [RentsService],
})
export class RentsModule {}
