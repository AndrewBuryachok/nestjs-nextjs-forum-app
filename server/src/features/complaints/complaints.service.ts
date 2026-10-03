import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Complaint } from './complaint.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private complaintsRepository: Repository<Complaint>,
  ) {}

  async getMainComplaints(req: Request): Promise<Response<Complaint>> {
    const [data, total] = await this.getComplaintsQueryBuilder(req)
      .andWhere('complaint.closedAt IS NULL')
      .getManyAndCount();
    return { data, total };
  }

  async getClosedComplaints(req: Request): Promise<Response<Complaint>> {
    const [data, total] = await this.getComplaintsQueryBuilder(req)
      .andWhere('complaint.closedAt IS NOT NULL')
      .getManyAndCount();
    return { data, total };
  }

  async getMyComplaints(
    myId: number,
    req: Request,
  ): Promise<Response<Complaint>> {
    const [data, total] = await this.getComplaintsQueryBuilder(req)
      .andWhere('complaint.closedAt IS NULL')
      .andWhere(
        new Brackets((qb) =>
          qb.where('senderUser.id = :myId').orWhere('receiverUser.id = :myId'),
        ),
        { myId },
      )
      .getManyAndCount();
    return { data, total };
  }

  async getAllComplaints(req: Request): Promise<Response<Complaint>> {
    const [data, total] =
      await this.getComplaintsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  private getComplaintsQueryBuilder(
    req: Request,
  ): SelectQueryBuilder<Complaint> {
    return this.complaintsRepository
      .createQueryBuilder('complaint')
      .select([
        'complaint.id',
        'complaint.title',
        'complaint.createdAt',
        'complaint.closedAt',
      ])
      .innerJoin('complaint.senderUser', 'senderUser')
      .addSelect(['senderUser.id', 'senderUser.nick', 'senderUser.avatar'])
      .innerJoin('complaint.receiverUser', 'receiverUser')
      .addSelect([
        'receiverUser.id',
        'receiverUser.nick',
        'receiverUser.avatar',
      ])
      .leftJoin('complaint.judgeUser', 'judgeUser')
      .addSelect(['judgeUser.id', 'judgeUser.nick', 'judgeUser.avatar'])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('complaint.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb
              .where('complaint.senderUserId = :userId')
              .orWhere('complaint.receiverUserId = :userId'),
        ),
        { userId: req.user },
      )
      .orderBy('complaint.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
