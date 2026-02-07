import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { CreateCardDto, ExtCreateCardDto } from './card.dto';
import { UserIdDto } from '../users/user.dto';
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

  @Get('my/select')
  selectMyCards(): Promise<Card[]> {
    return this.cardsService.selectUserCardsWithBalance(1);
  }

  @Get(':userId/select')
  selectUserCards(@Param() { userId }: UserIdDto): Promise<Card[]> {
    return this.cardsService.selectUserCards(userId);
  }

  @Get(':userId/select-with-balance')
  selectUserCardsWithBalance(@Param() { userId }: UserIdDto): Promise<Card[]> {
    return this.cardsService.selectUserCardsWithBalance(userId);
  }

  @Post()
  createMyCard(@Body() dto: CreateCardDto): Promise<void> {
    return this.cardsService.createCard({ ...dto, userId: 1 });
  }

  @Post('all')
  createUserCard(@Body() dto: ExtCreateCardDto): Promise<void> {
    return this.cardsService.createCard(dto);
  }
}
