import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TownUser } from './town-user.entity';
import { TownsService } from './towns.service';
import { MqttService } from '../mqtt/mqtt.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { ResidentError } from './resident-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(TownUser)
    private townsUsersRepository: Repository<TownUser>,
    @Inject(forwardRef(() => TownsService))
    private townsService: TownsService,
    private mqttService: MqttService,
    private usersService: UsersService,
  ) {}

  async getMyResidents(myId: number, req: Request): Promise<Response<User>> {
    const townUsers = await this.townsUsersRepository.findBy({
      town: { townUsers: { userId: myId } },
    });
    const users = townUsers.map((townUser) => townUser.userId);
    return this.usersService.getUsersByIds(users, req);
  }

  async selectNotResidents(): Promise<User[]> {
    const townUsers = await this.townsUsersRepository.find();
    const users = townUsers.map((townUser) => townUser.userId);
    return this.usersService.selectUsersByNotIds(users);
  }

  async selectTownResidents(townId: number): Promise<User[]> {
    const townUsers = await this.townsUsersRepository.findBy({ townId });
    const users = townUsers.map((townUser) => townUser.userId);
    return this.usersService.selectUsersByIds(users);
  }

  async createResident(townId: number, userId: number): Promise<void> {
    await this.create(townId, userId);
  }

  async leaveTown(myId: number): Promise<void> {
    const townUser = await this.townsUsersRepository.findOne({
      relations: { town: true },
      where: { userId: myId },
    });
    if (!townUser) {
      throw new BadRequestException(ResidentError.NOT_RESIDENT);
    }
    this.throwIfResidentIsOwner(myId, townUser.town.userId);
    await this.delete(townUser.id);
    this.mqttService.publishNotification(
      myId,
      townUser.town.userId,
      myId,
      Notification.LEAVE_TOWN,
    );
  }

  async deleteResident(myId: number, userId: number): Promise<void> {
    this.throwIfResidentIsOwner(userId, myId);
    const town = await this.townsService.throwIfNotTownMayor(myId);
    const townUser = await this.throwIfResidentNotIn(town.id, userId);
    await this.delete(townUser.id);
    this.mqttService.publishNotification(
      myId,
      userId,
      userId,
      Notification.DELETE_RESIDENT,
    );
  }

  countTownResidents(townId: number): Promise<number> {
    return this.townsUsersRepository.countBy({ townId });
  }

  async throwIfResidentAlreadyIn(userId: number): Promise<void> {
    const townUser = await this.townsUsersRepository.findOneBy({ userId });
    if (townUser) {
      throw new BadRequestException(ResidentError.ALREADY_IN);
    }
  }

  async throwIfResidentNotIn(
    townId: number,
    userId: number,
  ): Promise<TownUser> {
    const townUser = await this.townsUsersRepository.findOneBy({
      townId,
      userId,
    });
    if (!townUser) {
      throw new BadRequestException(ResidentError.NOT_IN);
    }
    return townUser;
  }

  private throwIfResidentIsOwner(userId: number, ownerUserId: number): void {
    if (userId === ownerUserId) {
      throw new BadRequestException(ResidentError.OWNER);
    }
  }

  private async create(townId: number, userId: number): Promise<TownUser> {
    try {
      const townUser = this.townsUsersRepository.create({ townId, userId });
      await this.townsUsersRepository.save(townUser);
      return townUser;
    } catch (error) {
      throw new InternalServerErrorException(ResidentError.CREATE_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.townsUsersRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(ResidentError.DELETE_FAILED);
    }
  }
}
