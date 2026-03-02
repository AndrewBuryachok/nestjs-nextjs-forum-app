import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './shop.entity';
import { CardsModule } from '../cards/cards.module';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), CardsModule],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
