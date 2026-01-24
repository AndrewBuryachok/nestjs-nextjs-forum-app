import { Controller, Get } from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card.entity';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get('my')
  getMyCards(): Promise<Card[]> {
    return this.cardsService.getMyCards(1);
  }

  @Get('all')
  getAllCards(): Promise<Card[]> {
    return this.cardsService.getAllCards();
  }
}
