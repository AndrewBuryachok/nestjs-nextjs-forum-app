import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardUser } from './card-user.entity';
import { UsersModule } from '../users/users.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card, CardUser]), UsersModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
