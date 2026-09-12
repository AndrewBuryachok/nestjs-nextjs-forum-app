import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plot } from './plot.entity';
import { CardsModule } from '../cards/cards.module';
import { MarketsModule } from '../markets/markets.module';
import { PlotsController } from './plots.controller';
import { PlotsService } from './plots.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plot]), CardsModule, MarketsModule],
  controllers: [PlotsController],
  providers: [PlotsService],
})
export class PlotsModule {}
