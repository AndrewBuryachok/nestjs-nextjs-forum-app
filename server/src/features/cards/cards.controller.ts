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
import { User } from '../users/user.entity';
import {
  CardIdDto,
  CreateCardDto,
  CreateCardWithUserDto,
  EditCardDto,
  UpdateCardUserDto,
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

  @Public()
  @Get(':cardId/users')
  selectCardUsers(@Param() { cardId }: CardIdDto): Promise<User[]> {
    return this.cardsService.selectCardUsers(cardId);
  }

  @Public()
  @Get(':cardId/not-users')
  selectNotCardUsers(@Param() { cardId }: CardIdDto): Promise<User[]> {
    return this.cardsService.selectNotCardUsers(cardId);
  }

  @Post()
  createMyCard(
    @MyId() myId: number,
    @Body() dto: CreateCardDto,
  ): Promise<void> {
    return this.cardsService.createCard({ ...dto, userId: myId });
  }

  @Post('all')
  createUserCard(@Body() dto: CreateCardWithUserDto): Promise<void> {
    return this.cardsService.createCard(dto);
  }

  @Patch(':cardId')
  editMyCard(
    @MyId() myId: number,
    @Param() { cardId }: CardIdDto,
    @Body() dto: EditCardDto,
  ): Promise<void> {
    return this.cardsService.editMyCard(myId, cardId, dto);
  }

  @Patch('all/:cardId')
  editUserCard(
    @Param() { cardId }: CardIdDto,
    @Body() dto: EditCardDto,
  ): Promise<void> {
    return this.cardsService.editUserCard(cardId, dto);
  }

  @Delete(':cardId')
  deleteMyCard(
    @MyId() myId: number,
    @Param() { cardId }: CardIdDto,
  ): Promise<void> {
    return this.cardsService.deleteMyCard(myId, cardId);
  }

  @Delete('all/:cardId')
  deleteUserCard(@Param() { cardId }: CardIdDto): Promise<void> {
    return this.cardsService.deleteUserCard(cardId);
  }

  @Post(':cardId/users')
  addMyCardUser(
    @MyId() myId: number,
    @Param() { cardId }: CardIdDto,
    @Body() dto: UpdateCardUserDto,
  ): Promise<void> {
    return this.cardsService.addMyCardUser(myId, cardId, dto);
  }

  @Post('all/:cardId/users')
  addUserCardUser(
    @Param() { cardId }: CardIdDto,
    @Body() dto: UpdateCardUserDto,
  ): Promise<void> {
    return this.cardsService.addUserCardUser(cardId, dto);
  }

  @Delete(':cardId/users')
  removeMyCardUser(
    @MyId() myId: number,
    @Param() { cardId }: CardIdDto,
    @Body() dto: UpdateCardUserDto,
  ): Promise<void> {
    return this.cardsService.removeMyCardUser(myId, cardId, dto);
  }

  @Delete('all/:cardId/users')
  removeUserCardUser(
    @Param() { cardId }: CardIdDto,
    @Body() dto: UpdateCardUserDto,
  ): Promise<void> {
    return this.cardsService.removeUserCardUser(cardId, dto);
  }
}
