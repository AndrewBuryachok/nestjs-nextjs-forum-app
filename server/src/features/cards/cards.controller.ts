import { Controller, Get, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { Request, Response } from '../../common/interfaces';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get('my')
  getMyCards(@Query() req: Request): Promise<Response<Card>> {
    return this.cardsService.getMyCards(1, req);
  }

  @Get('all')
  getAllCards(@Query() req: Request): Promise<Response<Card>> {
    return this.cardsService.getAllCards(req);
  }
}
