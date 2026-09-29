import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Town } from './town.entity';
import { UsersModule } from '../users/users.module';
import { TownsController } from './towns.controller';
import { TownsService } from './towns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Town]), UsersModule],
  controllers: [TownsController],
  providers: [TownsService],
})
export class TownsModule {}
