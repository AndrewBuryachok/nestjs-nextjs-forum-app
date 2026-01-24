import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Card } from './card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Card])],
})
export class CardsModule {}
