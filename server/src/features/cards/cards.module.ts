import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardUser } from './card-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, CardUser])],
})
export class CardsModule {}
