import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ForumService } from './forum.service';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Fine } from '../fines/fine.entity';
import { UserIdDto, UserNickDto } from '../users/user.dto';
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

  @Get(':userId/cards/my')
  getMyCards(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Card>> {
    return this.forumService.getMyCards(userId, req);
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
}
