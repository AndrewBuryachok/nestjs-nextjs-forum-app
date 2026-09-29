import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Town } from './town.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { UsersService } from '../users/users.service';
import { CreateTownWithUserDto } from './town.dto';
import { TownError } from './town-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class TownsService {
  constructor(
    @InjectRepository(Town)
    private townsRepository: Repository<Town>,
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
      .andWhere('ownerUser.id = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllTowns(req: Request): Promise<Response<Town>> {
    const [data, total] =
      await this.getTownsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createTown(dto: CreateTownWithUserDto): Promise<void> {
    await this.usersService.throwIfUserNotFound(dto.userId);
    const town = await this.create(dto);
    this.mqttService.publishNotification(
      dto.userId,
      0,
      town.id,
      Notification.CREATE_TOWN,
    );
  }

  private async create(dto: CreateTownWithUserDto): Promise<Town> {
    try {
      const town = this.townsRepository.create({
        userId: dto.userId,
        name: dto.name,
        x: dto.x,
        y: dto.y,
      });
      await this.townsRepository.save(town);
      return town;
    } catch (error) {
      throw new InternalServerErrorException(TownError.CREATE_FAILED);
    }
  }

  private getTownsQueryBuilder(req: Request): SelectQueryBuilder<Town> {
    return this.townsRepository
      .createQueryBuilder('town')
      .select(['town.id', 'town.name', 'town.x', 'town.y', 'town.createdAt'])
      .innerJoin('town.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
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
