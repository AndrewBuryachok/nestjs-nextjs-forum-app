import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Landmark } from './landmark.entity';
import { UsersModule } from '../users/users.module';
import { LandmarksController } from './landmarks.controller';
import { LandmarksService } from './landmarks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Landmark]), UsersModule],
  controllers: [LandmarksController],
  providers: [LandmarksService],
})
export class LandmarksModule {}
