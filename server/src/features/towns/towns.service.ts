import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, IsNull, Repository, SelectQueryBuilder } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Town } from './town.entity';
import { TownUser } from './town-user.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import {
  CreateTownWithUserDto,
  EditTownDto,
  UpdateTownUserDto,
} from './town.dto';
import { TownError } from './town-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class TownsService {
  constructor(
    @InjectRepository(Town)
    private townsRepository: Repository<Town>,
    @InjectRepository(TownUser)
    private townsUsersRepository: Repository<TownUser>,
    private mqttService: MqttService,
    private usersService: UsersService,
  ) {}

  async getMainTowns(req: Request): Promise<Response<Town>> {
    const [data, total] =
      await this.getTownsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyTowns(myId: number, req: Request): Promise<Response<Town>> {
    const [data, total] = await this.getTownsQueryBuilder(req)
      .innerJoin('town.townUsers', 'townUsers')
      .andWhere('townUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllTowns(req: Request): Promise<Response<Town>> {
    const [data, total] =
      await this.getTownsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async selectTownUsers(townId: number): Promise<User[]> {
    const townUsers = await this.townsUsersRepository.findBy({ townId });
    const users = townUsers.map((townUser) => townUser.userId);
    return this.usersService.selectUsersByIds(users);
  }

  async selectNotTownUsers(): Promise<User[]> {
    const townUsers = await this.townsUsersRepository.find();
    const users = townUsers.map((townUser) => townUser.userId);
    return this.usersService.selectUsersByNotIds(users);
  }

  async createTown(dto: CreateTownWithUserDto): Promise<void> {
    await this.usersService.throwIfUserNotFound(dto.userId);
    await this.throwIfUserAlreadyIn(dto.userId);
    const town = await this.create(dto);
    this.mqttService.publishNotification(
      dto.userId,
      0,
      town.id,
      Notification.CREATE_TOWN,
    );
  }

  async editMyTown(
    myId: number,
    townId: number,
    dto: EditTownDto,
  ): Promise<void> {
    await this.throwIfNotTownOwner(townId, myId);
    await this.edit(townId, dto);
  }

  async editUserTown(townId: number, dto: EditTownDto): Promise<void> {
    await this.throwIfTownNotFound(townId);
    await this.edit(townId, dto);
  }

  async deleteMyTown(myId: number, townId: number): Promise<void> {
    const town = await this.throwIfNotTownOwner(townId, myId);
    await this.deleteTown(town);
  }

  async deleteUserTown(townId: number): Promise<void> {
    const town = await this.throwIfTownNotFound(townId);
    await this.deleteTown(town);
  }

  private async deleteTown(town: Town): Promise<void> {
    const users = await this.townsUsersRepository.countBy({
      townId: town.id,
    });
    if (users > 1) {
      throw new BadRequestException(TownError.HAS_USER);
    }
    await this.delete(town.id);
  }

  async addMyTownUser(
    myId: number,
    townId: number,
    dto: UpdateTownUserDto,
  ): Promise<void> {
    const town = await this.throwIfNotTownOwner(townId, myId);
    await this.addTownUser(town, dto.userId);
  }

  async addUserTownUser(townId: number, dto: UpdateTownUserDto): Promise<void> {
    const town = await this.throwIfTownNotFound(townId);
    await this.addTownUser(town, dto.userId);
  }

  private async addTownUser(town: Town, userId: number): Promise<void> {
    await this.usersService.throwIfUserNotFound(userId);
    await this.throwIfUserAlreadyIn(userId);
    await this.addUser(town.id, userId);
    this.mqttService.publishNotification(
      town.userId,
      userId,
      town.id,
      Notification.ADD_TOWN_USER,
    );
  }

  async removeMyTownUser(
    myId: number,
    townId: number,
    dto: UpdateTownUserDto,
  ): Promise<void> {
    const town = await this.throwIfNotTownOwner(townId, myId);
    await this.removeTownUser(town, dto.userId);
  }

  async removeUserTownUser(
    townId: number,
    dto: UpdateTownUserDto,
  ): Promise<void> {
    const town = await this.throwIfTownNotFound(townId);
    await this.removeTownUser(town, dto.userId);
  }

  private async removeTownUser(town: Town, userId: number): Promise<void> {
    await this.usersService.throwIfUserNotFound(userId);
    if (town.userId === userId) {
      throw new BadRequestException(TownError.USER_IS_OWNER);
    }
    const townUser = await this.townsUsersRepository.findOneBy({
      townId: town.id,
      userId,
    });
    if (!townUser) {
      throw new BadRequestException(TownError.USER_NOT_IN);
    }
    await this.removeUser(townUser.id);
    this.mqttService.publishNotification(
      town.userId,
      userId,
      town.id,
      Notification.REMOVE_TOWN_USER,
    );
  }

  async throwIfTownNotFound(townId: number): Promise<Town> {
    const town = await this.findTownById(townId);
    if (!town) {
      throw new NotFoundException(TownError.NOT_FOUND);
    }
    return town;
  }

  async throwIfNotTownOwner(townId: number, userId: number): Promise<Town> {
    const town = await this.throwIfTownNotFound(townId);
    if (town.userId !== userId) {
      throw new ForbiddenException(TownError.NOT_OWNER);
    }
    return town;
  }

  async throwIfUserAlreadyIn(userId: number): Promise<void> {
    const townUser = await this.townsUsersRepository.findOneBy({ userId });
    if (townUser) {
      throw new BadRequestException(TownError.USER_ALREADY_IN);
    }
  }

  private findTownById(id: number): Promise<Town | null> {
    return this.townsRepository.findOneBy({ id });
  }

  @Transactional()
  private async create(dto: CreateTownWithUserDto): Promise<Town> {
    try {
      const town = this.townsRepository.create({
        userId: dto.userId,
        name: dto.name,
        world: dto.world,
        x: dto.x,
        y: dto.y,
      });
      await this.townsRepository.save(town);
      const townUser = this.townsUsersRepository.create({
        townId: town.id,
        userId: dto.userId,
      });
      await this.townsUsersRepository.save(townUser);
      return town;
    } catch (error) {
      throw new InternalServerErrorException(TownError.CREATE_FAILED);
    }
  }

  private async edit(id: number, dto: EditTownDto): Promise<void> {
    try {
      await this.townsRepository.update(
        { id },
        { name: dto.name, world: dto.world, x: dto.x, y: dto.y },
      );
    } catch (error) {
      throw new InternalServerErrorException(TownError.EDIT_FAILED);
    }
  }

  @Transactional()
  private async delete(id: number): Promise<void> {
    try {
      await this.townsUsersRepository.softDelete({
        townId: id,
        deletedAt: IsNull(),
      });
      await this.townsRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(TownError.DELETE_FAILED);
    }
  }

  private async addUser(townId: number, userId: number): Promise<void> {
    try {
      const townUser = this.townsUsersRepository.create({ townId, userId });
      await this.townsUsersRepository.save(townUser);
    } catch (error) {
      throw new InternalServerErrorException(TownError.ADD_USER_FAILED);
    }
  }

  private async removeUser(id: number): Promise<void> {
    try {
      await this.townsUsersRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(TownError.REMOVE_USER_FAILED);
    }
  }

  private getTownsQueryBuilder(req: Request): SelectQueryBuilder<Town> {
    return this.townsRepository
      .createQueryBuilder('town')
      .select([
        'town.id',
        'town.name',
        'town.world',
        'town.x',
        'town.y',
        'town.createdAt',
      ])
      .innerJoin('town.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .loadRelationCountAndMap('town.users', 'town.townUsers')
      .where(
        new Brackets(
          (qb) => req.id && qb.where('town.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user && qb.where('town.userId = :userId', { userId: req.user }),
        ),
      )
      .orderBy('town.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
