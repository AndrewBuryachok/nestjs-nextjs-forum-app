import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CardsModule } from '../cards/cards.module';
import { ShopsModule } from '../shops/shops.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CardsModule, ShopsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
