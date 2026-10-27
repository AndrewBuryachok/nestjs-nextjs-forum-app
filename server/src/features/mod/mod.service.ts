import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CardsService } from '../cards/cards.service';
import { TownsService } from '../towns/towns.service';
import { ResidentsService } from '../towns/residents.service';
import { InvitationsService } from '../towns/invitations.service';
import { ApplicationsService } from '../towns/applications.service';
import { Town } from '../towns/town.entity';
import { ModError } from './mod-errors.enum';
import { CreateTownDto } from '../towns/town.dto';

@Injectable()
export class ModService {
  constructor(
    private usersService: UsersService,
    private cardsService: CardsService,
    private townsService: TownsService,
    private residentsService: ResidentsService,
    private invitationsService: InvitationsService,
    private applicationsService: ApplicationsService,
  ) {}

  async sumUserCards(nick: string): Promise<number> {
    const userId = await this.throwIfUserByNickNotFound(nick);
    return this.cardsService.sumUserCards(userId);
  }

  async getMainTowns(): Promise<Town[]> {
    const towns = await this.townsService.getMainTowns({});
    return towns.data;
  }

  async getMyTown(nick: string): Promise<Town> {
    const userId = await this.throwIfUserByNickNotFound(nick);
    const towns = await this.townsService.getMyTowns(userId, {});
    if (!towns.data.length) {
      throw new NotFoundException(ModError.UNKNOWN_TOWN);
    }
    return towns.data[0];
  }

  async createTown(nick: string, dto: CreateTownDto): Promise<void> {
    const userId = await this.throwIfUserByNickNotFound(nick);
    await this.townsService.createTown({ ...dto, userId: userId });
  }

  async getNotResidents(): Promise<string[]> {
    const residents = await this.residentsService.selectNotResidents();
    return residents.map((user) => user.nick);
  }

  async getMyResidents(nick: string): Promise<string[]> {
    const userId = await this.throwIfUserByNickNotFound(nick);
    const residents = await this.residentsService.getMyResidents(userId, {});
    return residents.data.map((user) => user.nick);
  }

  async getSentInvitations(nick: string): Promise<string[]> {
    const userId = await this.throwIfUserByNickNotFound(nick);
    const invitations = await this.invitationsService.getSentInvitations(
      userId,
      {},
    );
    return invitations.data.map((user) => user.nick);
  }

  async getReceivedInvitations(nick: string): Promise<Town[]> {
    const userId = await this.throwIfUserByNickNotFound(nick);
    const invitations = await this.invitationsService.getReceivedInvitations(
      userId,
      {},
    );
    return invitations.data;
  }

  async createInvitation(
    senderNick: string,
    receiverNick: string,
  ): Promise<void> {
    const senderUserId = await this.throwIfUserByNickNotFound(senderNick);
    const receiverUserId = await this.throwIfUserByNickNotFound(receiverNick);
    await this.invitationsService.createInvitation(senderUserId, {
      userId: receiverUserId,
    });
  }

  async deleteInvitation(
    senderNick: string,
    receiverNick: string,
  ): Promise<void> {
    const senderUserId = await this.throwIfUserByNickNotFound(senderNick);
    const receiverUserId = await this.throwIfUserByNickNotFound(receiverNick);
    await this.invitationsService.deleteInvitation(
      senderUserId,
      receiverUserId,
    );
  }

  async acceptInvitation(
    senderNick: string,
    receiverNick: string,
  ): Promise<void> {
    const senderUserId = await this.throwIfUserByNickNotFound(senderNick);
    const receiverUserId = await this.throwIfUserByNickNotFound(receiverNick);
    const town = await this.townsService.throwIfNotTownMayor(senderUserId);
    await this.invitationsService.acceptInvitation(receiverUserId, town.id);
  }

  async rejectInvitation(
    senderNick: string,
    receiverNick: string,
  ): Promise<void> {
    const senderUserId = await this.throwIfUserByNickNotFound(senderNick);
    const receiverUserId = await this.throwIfUserByNickNotFound(receiverNick);
    const town = await this.townsService.throwIfNotTownMayor(senderUserId);
    await this.invitationsService.rejectInvitation(receiverUserId, town.id);
  }

  async getSentApplications(nick: string): Promise<Town[]> {
    const userId = await this.throwIfUserByNickNotFound(nick);
    const applications = await this.applicationsService.getSentApplications(
      userId,
      {},
    );
    return applications.data;
  }

  async getReceivedApplications(nick: string): Promise<string[]> {
    const userId = await this.throwIfUserByNickNotFound(nick);
    const applications = await this.applicationsService.getReceivedApplications(
      userId,
      {},
    );
    return applications.data.map((user) => user.nick);
  }

  async createApplication(
    senderNick: string,
    receiverNick: string,
  ): Promise<void> {
    const senderUserId = await this.throwIfUserByNickNotFound(senderNick);
    const receiverUserId = await this.throwIfUserByNickNotFound(receiverNick);
    const town = await this.townsService.throwIfNotTownMayor(receiverUserId);
    await this.applicationsService.createApplication(senderUserId, {
      townId: town.id,
    });
  }

  async deleteApplication(
    senderNick: string,
    receiverNick: string,
  ): Promise<void> {
    const senderUserId = await this.throwIfUserByNickNotFound(senderNick);
    const receiverUserId = await this.throwIfUserByNickNotFound(receiverNick);
    const town = await this.townsService.throwIfNotTownMayor(receiverUserId);
    await this.applicationsService.deleteApplication(senderUserId, town.id);
  }

  async acceptApplication(
    senderNick: string,
    receiverNick: string,
  ): Promise<void> {
    const senderUserId = await this.throwIfUserByNickNotFound(senderNick);
    const receiverUserId = await this.throwIfUserByNickNotFound(receiverNick);
    await this.applicationsService.acceptApplication(
      receiverUserId,
      senderUserId,
    );
  }

  async rejectApplication(
    senderNick: string,
    receiverNick: string,
  ): Promise<void> {
    const senderUserId = await this.throwIfUserByNickNotFound(senderNick);
    const receiverUserId = await this.throwIfUserByNickNotFound(receiverNick);
    await this.applicationsService.rejectApplication(
      receiverUserId,
      senderUserId,
    );
  }

  async throwIfUserByNickNotFound(nick: string): Promise<number> {
    const userId = await this.usersService.findIdByNick(nick);
    if (!userId) {
      throw new NotFoundException(ModError.UNKNOWN_USER);
    }
    return userId;
  }
}
