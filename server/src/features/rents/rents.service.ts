import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Rent } from './rent.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(Rent)
    private rentsRepository: Repository<Rent>,
  ) {}

  async getMainRents(req: Request): Promise<Response<Rent>> {
    const [data, total] = await this.getRentsQueryBuilder(req)
      .andWhere('rent.completedAt > NOW()')
      .getManyAndCount();
    return { data, total };
  }

  async getMyRents(myId: number, req: Request): Promise<Response<Rent>> {
    const [data, total] = await this.getMyRentsQueryBuilder(myId, req)
      .andWhere('rent.completedAt > NOW()')
      .getManyAndCount();
    return { data, total };
  }

  async getCompletedRents(myId: number, req: Request): Promise<Response<Rent>> {
    const [data, total] = await this.getMyRentsQueryBuilder(myId, req)
      .andWhere('rent.completedAt < NOW()')
      .getManyAndCount();
    return { data, total };
  }

  async getAllRents(req: Request): Promise<Response<Rent>> {
    const [data, total] =
      await this.getRentsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  private getMyRentsQueryBuilder(
    myId: number,
    req: Request,
  ): SelectQueryBuilder<Rent> {
    return this.getRentsQueryBuilder(req)
      .leftJoin('ownerCard.cardUsers', 'ownerCardUsers')
      .leftJoin('renterCard.cardUsers', 'renterCardUsers')
      .andWhere(
        new Brackets((qb) =>
          qb
            .where('ownerCardUsers.userId = :myId')
            .orWhere('renterCardUsers.userId = :myId'),
        ),
        { myId },
      );
  }

  private getRentsQueryBuilder(req: Request): SelectQueryBuilder<Rent> {
    return this.rentsRepository
      .createQueryBuilder('rent')
      .select(['rent.id', 'rent.createdAt', 'rent.completedAt'])
      .innerJoin('rent.plot', 'plot')
      .addSelect(['plot.id', 'plot.name', 'plot.x', 'plot.y', 'plot.price'])
      .innerJoin('plot.market', 'market')
      .addSelect(['market.id', 'market.name', 'market.x', 'market.y'])
      .innerJoin('market.user', 'ownerUser')
      .addSelect(['ownerUser.id', 'ownerUser.nick', 'ownerUser.avatar'])
      .innerJoin('market.card', 'ownerCard')
      .addSelect(['ownerCard.id', 'ownerCard.name'])
      .innerJoin('rent.user', 'renterUser')
      .addSelect(['renterUser.id', 'renterUser.nick', 'renterUser.avatar'])
      .innerJoin('rent.card', 'renterCard')
      .addSelect(['renterCard.id', 'renterCard.name'])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('rent.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb
              .where('rent.userId = :userId')
              .orWhere('market.userId = :userId'),
        ),
        { userId: req.user },
      )
      .orderBy('rent.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
