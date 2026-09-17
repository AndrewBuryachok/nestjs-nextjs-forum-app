import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Landmark } from './landmark.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class LandmarksService {
  constructor(
    @InjectRepository(Landmark)
    private landmarksRepository: Repository<Landmark>,
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
