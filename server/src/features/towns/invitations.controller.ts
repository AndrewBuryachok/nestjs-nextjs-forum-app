import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { Town } from './town.entity';
import { User } from '../users/user.entity';
import { CreateInvitationDto } from './invitation.dto';
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

  @Post()
  createInvitation(
    @MyId() myId: number,
    @Body() dto: CreateInvitationDto,
  ): Promise<void> {
    return this.invitationsService.createInvitation(myId, dto);
  }
}
