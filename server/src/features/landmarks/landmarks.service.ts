import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Landmark } from './landmark.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { UsersService } from '../users/users.service';
import { CreateLandmarkWithUserDto } from './landmark.dto';
import { LandmarkError } from './landmark-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class LandmarksService {
  constructor(
    @InjectRepository(Landmark)
    private landmarksRepository: Repository<Landmark>,
    private mqttService: MqttService,
    private usersService: UsersService,
  ) {}

  async getMainLandmarks(req: Request): Promise<Response<Landmark>> {
    const [data, total] =
      await this.getLandmarksQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyLandmarks(
    myId: number,
    req: Request,
  ): Promise<Response<Landmark>> {
    const [data, total] = await this.getLandmarksQueryBuilder(req)
      .andWhere('responsibleUser.id = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllLandmarks(req: Request): Promise<Response<Landmark>> {
    const [data, total] =
      await this.getLandmarksQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createLandmark(dto: CreateLandmarkWithUserDto): Promise<void> {
    await this.usersService.throwIfUserNotFound(dto.userId);
    const landmark = await this.create(dto);
    this.mqttService.publishNotification(
      dto.userId,
      0,
      landmark.id,
      Notification.CREATE_LOCKER,
    );
  }

  private async create(dto: CreateLandmarkWithUserDto): Promise<Landmark> {
    try {
      const landmark = this.landmarksRepository.create({
        userId: dto.userId,
        name: dto.name,
        x: dto.x,
        y: dto.y,
      });
      await this.landmarksRepository.save(landmark);
      return landmark;
    } catch (error) {
      throw new InternalServerErrorException(LandmarkError.CREATE_FAILED);
    }
  }

  private getLandmarksQueryBuilder(req: Request): SelectQueryBuilder<Landmark> {
    return this.landmarksRepository
      .createQueryBuilder('landmark')
      .select([
        'landmark.id',
        'landmark.name',
        'landmark.x',
        'landmark.y',
        'landmark.createdAt',
      ])
      .innerJoin('landmark.user', 'responsibleUser')
      .addSelect([
        'responsibleUser.id',
        'responsibleUser.nick',
        'responsibleUser.avatar',
      ])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('landmark.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb.where('landmark.userId = :userId', { userId: req.user }),
        ),
      )
      .orderBy('landmark.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
