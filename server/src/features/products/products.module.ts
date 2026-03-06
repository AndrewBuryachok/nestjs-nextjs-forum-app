import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ShopsModule } from '../shops/shops.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ShopsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
