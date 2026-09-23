import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Plot } from './plot.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class PlotsService {
  constructor(
    @InjectRepository(Plot)
    private plotsRepository: Repository<Plot>,
  ) {}

  async getMainPlots(req: Request): Promise<Response<Plot>> {
    const [data, total] =
      await this.getPlotsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getMyPlots(myId: number, req: Request): Promise<Response<Plot>> {
    const [data, total] = await this.getPlotsQueryBuilder(req)
      .innerJoin('ownerCard.cardUsers', 'ownerCardUsers')
      .andWhere('ownerCardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllPlots(req: Request): Promise<Response<Plot>> {
    const [data, total] =
      await this.getPlotsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  private getPlotsQueryBuilder(req: Request): SelectQueryBuilder<Plot> {
    return this.plotsRepository
      .createQueryBuilder('plot')
      .select([
        'plot.id',
        'plot.name',
        'plot.x',
        'plot.y',
        'plot.price',
        'plot.createdAt',
      ])
      .innerJoin('plot.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .innerJoin('plot.card', 'ownerCard')
      .addSelect(['ownerCard.id', 'ownerCard.name'])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('plot.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user && qb.where('plot.userId = :userId', { userId: req.user }),
        ),
      )
      .orderBy('plot.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
