import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ForumService } from './forum.service';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Fine } from '../fines/fine.entity';
import { UserIdDto, UserNickDto } from '../users/user.dto';
import { CardIdDto } from '../cards/card.dto';
import { Public } from '../../common/decorators';
import { ForumApiKeyGuard } from '../../common/guards';
import { Request, Response } from '../../common/interfaces';

@Public()
@UseGuards(ForumApiKeyGuard)
@Controller('forum')
export class ForumController {
  constructor(private forumService: ForumService) {}

  @Get(':nick/auth')
  selectOneUser(@Param() { nick }: UserNickDto): Promise<User> {
    return this.forumService.selectOneUser(nick);
  }

  @Get(':userId/users/all/select')
  selectAllUsers(): Promise<User[]> {
    return this.forumService.selectAllUsers();
  }

  @Get(':userId/cards/my')
  getMyCards(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Card>> {
    return this.forumService.getMyCards(userId, req);
  }

  @Get(':userId/cards/my/select')
  selectMyCards(@Param() { userId }: UserIdDto): Promise<Card[]> {
    return this.forumService.selectMyCards(userId);
  }

  @Get(':myId/cards/:userId/select')
  selectUserCards(@Param() { userId }: UserIdDto): Promise<Card[]> {
    return this.forumService.selectUserCards(userId);
  }

  @Get(':myId/cards/:cardId/users')
  selectCardUsers(@Param() { cardId }: CardIdDto): Promise<User[]> {
    return this.forumService.selectCardUsers(cardId);
  }

  @Get(':myId/cards/:cardId/not-users')
  selectNotCardUsers(@Param() { cardId }: CardIdDto): Promise<User[]> {
    return this.forumService.selectNotCardUsers(cardId);
  }

  @Get(':userId/transactions/my')
  getMyTransactions(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Transaction>> {
    return this.forumService.getMyTransactions(userId, req);
  }

  @Get(':userId/fines/my')
  getMyFines(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Fine>> {
    return this.forumService.getMyFines(userId, req);
  }

  @Get(':userId/fines/paid')
  getPaidFines(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Fine>> {
    return this.forumService.getPaidFines(userId, req);
  }
}
