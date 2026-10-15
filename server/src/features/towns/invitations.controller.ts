import { Controller, Get, Query } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { Town } from './town.entity';
import { User } from '../users/user.entity';
import { MyId } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';

@Controller('invitations')
export class InvitationsController {
  constructor(private invitationsService: InvitationsService) {}

  @Get('sent')
  getSentInvitations(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<User>> {
    return this.invitationsService.getSentInvitations(myId, req);
  }

  @Get('received')
  getReceivedInvitations(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Town>> {
    return this.invitationsService.getReceivedInvitations(myId, req);
  }
}
