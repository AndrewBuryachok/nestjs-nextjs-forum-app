import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import {
  CardIdDto,
  CreateCardDto,
  EditCardDto,
  ExtCreateCardDto,
} from './card.dto';
import { UserIdDto } from '../users/user.dto';
import { MyId, Public } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get('my')
  getMyCards(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Card>> {
    return this.cardsService.getMyCards(myId, req);
  }

  @Get('all')
  getAllCards(@Query() req: Request): Promise<Response<Card>> {
    return this.cardsService.getAllCards(req);
  }

  @Get('my/select')
  selectMyCards(@MyId() myId: number): Promise<Card[]> {
    return this.cardsService.selectUserCardsWithBalance(myId);
  }

  @Public()
  @Get(':userId/select')
  selectUserCards(@Param() { userId }: UserIdDto): Promise<Card[]> {
    return this.cardsService.selectUserCards(userId);
  }

  @Get(':userId/select-with-balance')
  selectUserCardsWithBalance(@Param() { userId }: UserIdDto): Promise<Card[]> {
    return this.cardsService.selectUserCardsWithBalance(userId);
  }

  @Post()
  createMyCard(
    @MyId() myId: number,
    @Body() dto: CreateCardDto,
  ): Promise<void> {
    return this.cardsService.createCard({ ...dto, userId: myId });
  }

  @Post('all')
  createUserCard(@Body() dto: ExtCreateCardDto): Promise<void> {
    return this.cardsService.createCard(dto);
  }

  @Patch(':cardId')
  editMyCard(
    @MyId() myId: number,
    @Param() { cardId }: CardIdDto,
    @Body() dto: EditCardDto,
  ): Promise<void> {
    return this.cardsService.editCard({ ...dto, cardId, myId, isAll: false });
  }

  @Patch('all/:cardId')
  editUserCard(
    @MyId() myId: number,
    @Param() { cardId }: CardIdDto,
    @Body() dto: EditCardDto,
  ): Promise<void> {
    return this.cardsService.editCard({ ...dto, cardId, myId, isAll: true });
  }

  @Delete(':cardId')
  deleteMyCard(
    @MyId() myId: number,
    @Param() { cardId }: CardIdDto,
  ): Promise<void> {
    return this.cardsService.deleteCard({ cardId, myId, isAll: false });
  }

  @Delete('all/:cardId')
  deleteUserCard(
    @MyId() myId: number,
    @Param() { cardId }: CardIdDto,
  ): Promise<void> {
    return this.cardsService.deleteCard({ cardId, myId, isAll: true });
  }
}
