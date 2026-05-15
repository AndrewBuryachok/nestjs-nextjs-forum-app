import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { GoodsModule } from '../goods/goods.module';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase]),
    forwardRef(() => GoodsModule),
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}
