import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Landmark } from './landmark.entity';
import { LandmarksController } from './landmarks.controller';
import { LandmarksService } from './landmarks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Landmark])],
  controllers: [LandmarksController],
  providers: [LandmarksService],
})
export class LandmarksModule {}
