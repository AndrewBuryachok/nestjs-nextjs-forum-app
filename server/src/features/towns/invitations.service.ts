import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Invitation } from './invitation.entity';
import { TownsService } from './towns.service';
import { UsersService } from '../users/users.service';
import { Town } from './town.entity';
import { User } from '../users/user.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationsRepository: Repository<Invitation>,
    private townsService: TownsService,
    private usersService: UsersService,
  ) {}

  async getSentInvitations(
    myId: number,
    req: Request,
  ): Promise<Response<User>> {
    const invitations = await this.invitationsRepository.findBy({
      town: { userId: myId },
      resolvedAt: IsNull(),
    });
    const users = invitations.map((invitation) => invitation.userId);
    return this.usersService.getUsersByIds(users, req);
  }

  async getReceivedInvitations(
    myId: number,
    req: Request,
  ): Promise<Response<Town>> {
    const invitations = await this.invitationsRepository.findBy({
      userId: myId,
      resolvedAt: IsNull(),
    });
    const towns = invitations.map((invitation) => invitation.townId);
    return this.townsService.getTownsByIds(towns, req);
  }
}
