import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Town } from './town.entity';
import { TownChunk } from './town-chunk.entity';
import { ResidentsService } from './residents.service';
import { MqttService } from '../mqtt/mqtt.service';
import { UsersService } from '../users/users.service';
import {
  CreateTownWithUserDto,
  EditTownDto,
  UpdateTownChunkDto,
} from './town.dto';
import { TownError } from './town-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class TownsService {
  constructor(
    @InjectRepository(Town)
    private townsRepository: Repository<Town>,
    @InjectRepository(TownChunk)
    private townsChunksRepository: Repository<TownChunk>,
    private configService: ConfigService,
    @Inject(forwardRef(() => ResidentsService))
    private residentsService: ResidentsService,
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

  async getTownsByIds(ids: number[], req: Request): Promise<Response<Town>> {
    const [data, total] = await this.getTownsQueryBuilder(req)
      .andWhere('town.id = ANY (:ids)', { ids })
      .getManyAndCount();
    return { data, total };
  }

  selectAllTowns(): Promise<Town[]> {
    return this.selectTownsQueryBuilder().getMany();
  }

  selectTownChunks(townId: number): Promise<TownChunk[]> {
    return this.selectTownsChunksQueryBuilder()
      .where('townChunk.townId = :townId', { townId })
      .getMany();
  }

  @Transactional()
  async createTown(dto: CreateTownWithUserDto): Promise<void> {
    await this.usersService.throwIfUserNotFound(dto.userId);
    await this.residentsService.throwIfResidentAlreadyIn(dto.userId);
    const town = await this.create(dto);
    await this.residentsService.createResident(town.id, dto.userId);
    this.mqttService.publishNotification(
      dto.userId,
      0,
      town.id,
      Notification.CREATE_TOWN,
    );
  }

  async upgradeMyTown(myId: number, townId: number): Promise<void> {
    const town = await this.throwIfNotTownOwner(townId, myId);
    await this.upgradeTown(town);
  }

  async upgradeUserTown(townId: number): Promise<void> {
    const town = await this.throwIfTownNotFound(townId);
    await this.upgradeTown(town);
  }

  private async upgradeTown(town: Town): Promise<void> {
    const maxLevel = Number(this.configService.getOrThrow('MAX_TOWN_LEVEL'));
    if (town.level === maxLevel) {
      throw new BadRequestException(TownError.MAX_LEVEL);
    }
    const users = await this.residentsService.countTownResidents(town.id);
    const minUsers = Number(
      this.configService.getOrThrow('MIN_TOWN_USERS').split(',')[
        town.level - 1
      ],
    );
    if (users < minUsers) {
      throw new BadRequestException(TownError.MIN_USERS);
    }
    await this.upgrade(town.id);
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

  async addMyTownChunk(
    myId: number,
    townId: number,
    dto: UpdateTownChunkDto,
  ): Promise<void> {
    const town = await this.throwIfNotTownOwner(townId, myId);
    await this.addTownChunk(town, dto);
  }

  async addUserTownChunk(
    townId: number,
    dto: UpdateTownChunkDto,
  ): Promise<void> {
    const town = await this.throwIfTownNotFound(townId);
    await this.addTownChunk(town, dto);
  }

  private async addTownChunk(
    town: Town,
    dto: UpdateTownChunkDto,
  ): Promise<void> {
    const chunks = await this.townsChunksRepository.countBy({
      townId: town.id,
    });
    const maxChunks = Number(
      this.configService.getOrThrow('MAX_TOWN_CHUNKS').split(',')[
        town.level - 1
      ],
    );
    if (chunks === maxChunks) {
      throw new BadRequestException(TownError.MAX_CHUNKS);
    }
    const townChunk = await this.townsChunksRepository.findOneBy({
      x: dto.x,
      y: dto.y,
    });
    if (townChunk) {
      throw new BadRequestException(TownError.CHUNK_ALREADY_IN);
    }
    await this.addChunk(town.id, dto.x, dto.y);
  }

  async removeMyTownChunk(
    myId: number,
    townId: number,
    dto: UpdateTownChunkDto,
  ): Promise<void> {
    const town = await this.throwIfNotTownOwner(townId, myId);
    await this.removeTownChunk(town, dto);
  }

  async removeUserTownChunk(
    townId: number,
    dto: UpdateTownChunkDto,
  ): Promise<void> {
    const town = await this.throwIfTownNotFound(townId);
    await this.removeTownChunk(town, dto);
  }

  private async removeTownChunk(
    town: Town,
    dto: UpdateTownChunkDto,
  ): Promise<void> {
    const townChunk = await this.townsChunksRepository.findOneBy({
      townId: town.id,
      x: dto.x,
      y: dto.y,
    });
    if (!townChunk) {
      throw new BadRequestException(TownError.CHUNK_NOT_IN);
    }
    await this.removeChunk(townChunk.id);
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

  async throwIfNotTownMayor(userId: number): Promise<Town> {
    const town = await this.findTownByUser(userId);
    if (!town) {
      throw new ForbiddenException(TownError.NOT_MAYOR);
    }
    return town;
  }

  private findTownById(id: number): Promise<Town | null> {
    return this.townsRepository.findOneBy({ id });
  }

  private findTownByUser(userId: number): Promise<Town | null> {
    return this.townsRepository.findOneBy({ userId });
  }

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
      return town;
    } catch (error) {
      throw new InternalServerErrorException(TownError.CREATE_FAILED);
    }
  }

  private async upgrade(id: number): Promise<void> {
    try {
      await this.townsRepository.increment({ id }, 'level', 1);
    } catch (error) {
      throw new InternalServerErrorException(TownError.UPGRADE_FAILED);
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

  private async addChunk(townId: number, x: number, y: number): Promise<void> {
    try {
      const townChunk = this.townsChunksRepository.create({ townId, x, y });
      await this.townsChunksRepository.save(townChunk);
    } catch (error) {
      throw new InternalServerErrorException(TownError.ADD_CHUNK_FAILED);
    }
  }

  private async removeChunk(id: number): Promise<void> {
    try {
      await this.townsChunksRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException(TownError.REMOVE_CHUNK_FAILED);
    }
  }

  private selectTownsChunksQueryBuilder(): SelectQueryBuilder<TownChunk> {
    return this.townsChunksRepository
      .createQueryBuilder('townChunk')
      .select(['townChunk.id', 'townChunk.x', 'townChunk.y'])
      .orderBy('townChunk.id', 'ASC');
  }

  private selectTownsQueryBuilder(): SelectQueryBuilder<Town> {
    return this.townsRepository
      .createQueryBuilder('town')
      .select(['town.id', 'town.name', 'town.world', 'town.x', 'town.y'])
      .orderBy('town.name', 'ASC');
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
        'town.level',
        'town.createdAt',
      ])
      .innerJoin('town.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .loadRelationCountAndMap('town.users', 'town.townUsers')
      .loadRelationCountAndMap('town.chunks', 'town.townChunks')
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
