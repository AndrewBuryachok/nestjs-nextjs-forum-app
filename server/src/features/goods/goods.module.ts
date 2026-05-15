import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from './good.entity';
import { ShopsModule } from '../shops/shops.module';
import { PurchasesModule } from '../purchases/purchases.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Good]),
    ShopsModule,
    forwardRef(() => PurchasesModule),
    TransactionsModule,
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
  exports: [GoodsService],
})
export class GoodsModule {}
