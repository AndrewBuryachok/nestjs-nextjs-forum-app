import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Invitation } from './invitation.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { TownsService } from './towns.service';
import { ResidentsService } from './residents.service';
import { UsersService } from '../users/users.service';
import { Town } from './town.entity';
import { User } from '../users/user.entity';
import { CreateInvitationDto } from './invitation.dto';
import { InvitationError } from './invitation-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private invitationsRepository: Repository<Invitation>,
    private mqttService: MqttService,
    private townsService: TownsService,
    private residentsService: ResidentsService,
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

  async createInvitation(
    myId: number,
    dto: CreateInvitationDto,
  ): Promise<void> {
    const town = await this.townsService.throwIfNotTownMayor(myId);
    await this.usersService.throwIfUserNotFound(dto.userId);
    await this.residentsService.throwIfResidentAlreadyExists(dto.userId);
    const invitation = await this.findInvitationByTownAndUser(
      town.id,
      dto.userId,
    );
    if (invitation) {
      throw new BadRequestException(InvitationError.ALREADY_EXISTS);
    }
    await this.create(town.id, dto.userId);
    this.mqttService.publishNotification(
      myId,
      dto.userId,
      town.id,
      Notification.CREATE_INVITATION,
    );
  }

  private findInvitationByTownAndUser(
    townId: number,
    userId: number,
  ): Promise<Invitation | null> {
    return this.invitationsRepository.findOneBy({ townId, userId });
  }

  private async create(townId: number, userId: number): Promise<Invitation> {
    try {
      const invitation = this.invitationsRepository.create({ townId, userId });
      await this.invitationsRepository.save(invitation);
      return invitation;
    } catch (error) {
      throw new InternalServerErrorException(InvitationError.CREATE_FAILED);
    }
  }
}
