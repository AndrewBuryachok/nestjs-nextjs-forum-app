import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Town } from './town.entity';
import { TownUser } from './town-user.entity';
import { UsersModule } from '../users/users.module';
import { TownsController } from './towns.controller';
import { TownsService } from './towns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Town, TownUser]), UsersModule],
  controllers: [TownsController],
  providers: [TownsService],
})
export class TownsModule {}
