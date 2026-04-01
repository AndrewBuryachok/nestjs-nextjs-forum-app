import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locker } from './locker.entity';
import { LockersController } from './lockers.controller';
import { LockersService } from './lockers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Locker])],
  controllers: [LockersController],
  providers: [LockersService],
})
export class LockersModule {}
