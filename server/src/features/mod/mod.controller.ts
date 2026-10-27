import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ModService } from './mod.service';
import { Town } from '../towns/town.entity';
import { SenderReceiverDto } from './mod.dto';
import { UserNickDto } from '../users/user.dto';
import { CreateTownDto } from '../towns/town.dto';
import { Public } from '../../common/decorators';
import { ModApiKeyGuard } from '../../common/guards';

@Public()
@UseGuards(ModApiKeyGuard)
@Controller('mod')
export class ModController {
  constructor(private modService: ModService) {}

  @Get('cards/:nick/sum')
  sumUserCards(@Param() { nick }: UserNickDto): Promise<number> {
    return this.modService.sumUserCards(nick);
  }

  @Get('towns')
  getMainTowns(): Promise<Town[]> {
    return this.modService.getMainTowns();
  }

  @Get('towns/:nick')
  getMyTown(@Param() { nick }: UserNickDto): Promise<Town> {
    return this.modService.getMyTown(nick);
  }

  @Post('towns/:nick')
  createTown(
    @Param() { nick }: UserNickDto,
    @Body() dto: CreateTownDto,
  ): Promise<void> {
    return this.modService.createTown(nick, dto);
  }

  @Get('residents/not')
  getNotResidents(): Promise<string[]> {
    return this.modService.getNotResidents();
  }

  @Get('residents/:nick/my')
  getMyResidents(@Param() { nick }: UserNickDto): Promise<string[]> {
    return this.modService.getMyResidents(nick);
  }

  @Get('invitations/:nick/sent')
  getSentInvitations(@Param() { nick }: UserNickDto): Promise<string[]> {
    return this.modService.getSentInvitations(nick);
  }

  @Get('invitations/:nick/received')
  getReceivedInvitations(@Param() { nick }: UserNickDto): Promise<Town[]> {
    return this.modService.getReceivedInvitations(nick);
  }

  @Post('invitations/:senderNick/:receiverNick')
  createInvitation(@Param() params: SenderReceiverDto): Promise<void> {
    return this.modService.createInvitation(
      params.senderNick,
      params.receiverNick,
    );
  }

  @Delete('invitations/:senderNick/:receiverNick')
  deleteInvitation(@Param() params: SenderReceiverDto): Promise<void> {
    return this.modService.deleteInvitation(
      params.senderNick,
      params.receiverNick,
    );
  }

  @Post('invitations/:senderNick/:receiverNick/accept')
  acceptInvitation(@Param() params: SenderReceiverDto): Promise<void> {
    return this.modService.acceptInvitation(
      params.senderNick,
      params.receiverNick,
    );
  }

  @Post('invitations/:senderNick/:receiverNick/reject')
  rejectInvitation(@Param() params: SenderReceiverDto): Promise<void> {
    return this.modService.rejectInvitation(
      params.senderNick,
      params.receiverNick,
    );
  }

  @Get('applications/:nick/sent')
  getSentApplications(@Param() { nick }: UserNickDto): Promise<Town[]> {
    return this.modService.getSentApplications(nick);
  }

  @Get('applications/:nick/received')
  getReceivedApplications(@Param() { nick }: UserNickDto): Promise<string[]> {
    return this.modService.getReceivedApplications(nick);
  }

  @Post('applications/:senderNick/:receiverNick')
  createApplication(@Param() params: SenderReceiverDto): Promise<void> {
    return this.modService.createApplication(
      params.senderNick,
      params.receiverNick,
    );
  }

  @Delete('applications/:senderNick/:receiverNick')
  deleteApplication(@Param() params: SenderReceiverDto): Promise<void> {
    return this.modService.deleteApplication(
      params.senderNick,
      params.receiverNick,
    );
  }

  @Post('applications/:senderNick/:receiverNick/accept')
  acceptApplication(@Param() params: SenderReceiverDto): Promise<void> {
    return this.modService.acceptApplication(
      params.senderNick,
      params.receiverNick,
    );
  }

  @Post('applications/:senderNick/:receiverNick/reject')
  rejectApplication(@Param() params: SenderReceiverDto): Promise<void> {
    return this.modService.rejectApplication(
      params.senderNick,
      params.receiverNick,
    );
  }
}
