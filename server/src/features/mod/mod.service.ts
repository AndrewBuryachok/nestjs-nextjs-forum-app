import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TownsService } from '../towns/towns.service';
import { User } from '../users/user.entity';
import { Town } from '../towns/town.entity';
import { ModError } from './mod-errors.enum';
import { CreateTownDto } from '../towns/town.dto';

@Injectable()
export class ModService {
  constructor(
    private usersService: UsersService,
    private townsService: TownsService,
  ) {}

  async getMainTowns(): Promise<Town[]> {
    const towns = await this.townsService.getMainTowns({});
    return towns.data;
  }

  async getMyTown(nick: string): Promise<Town> {
    const user = await this.throwIfUserByNickNotFound(nick);
    const towns = await this.townsService.getMyTowns(user.id, {});
    if (!towns.data.length) {
      throw new NotFoundException(ModError.UNKNOWN_TOWN);
    }
    return towns.data[0];
  }

  async createTown(nick: string, dto: CreateTownDto): Promise<void> {
    const user = await this.throwIfUserByNickNotFound(nick);
    await this.townsService.createTown({ ...dto, userId: user.id });
  }

  async throwIfUserByNickNotFound(nick: string): Promise<User> {
    const user = await this.usersService.findUserByNick(nick);
    if (!user) {
      throw new NotFoundException(ModError.UNKNOWN_USER);
    }
    return user;
  }
}
