import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Invoice } from './invoice.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
  ) {}

  async getMyInvoices(myId: number, req: Request): Promise<Response<Invoice>> {
    const [data, total] = await this.getInvoicesQueryBuilder(req)
      .innerJoin('senderCard.cardUsers', 'senderCardUsers')
      .leftJoin('receiverCard.cardUsers', 'receiverCardUsers')
      .andWhere(
        new Brackets((qb) =>
          qb
            .where('receiverUser.id = :myId')
            .orWhere('senderCardUsers.userId = :myId')
            .orWhere('receiverCardUsers.userId = :myId'),
        ),
        { myId },
      )
      .getManyAndCount();
    return { data, total };
  }

  async getAllInvoices(req: Request): Promise<Response<Invoice>> {
    const [data, total] =
      await this.getInvoicesQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  private getInvoicesQueryBuilder(req: Request): SelectQueryBuilder<Invoice> {
    return this.invoicesRepository
      .createQueryBuilder('invoice')
      .select([
        'invoice.id',
        'invoice.sum',
        'invoice.description',
        'invoice.createdAt',
        'invoice.paidAt',
      ])
      .innerJoin('invoice.senderUser', 'senderUser')
      .addSelect(['senderUser.id', 'senderUser.nick', 'senderUser.avatar'])
      .innerJoin('invoice.senderCard', 'senderCard')
      .addSelect(['senderCard.id', 'senderCard.name'])
      .innerJoin('invoice.receiverUser', 'receiverUser')
      .addSelect([
        'receiverUser.id',
        'receiverUser.nick',
        'receiverUser.avatar',
      ])
      .leftJoin('invoice.receiverCard', 'receiverCard')
      .addSelect(['receiverCard.id', 'receiverCard.name'])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('invoice.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb
              .where('invoice.senderUserId = :userId')
              .orWhere('invoice.receiverUserId = :userId'),
        ),
        { userId: req.user },
      )
      .orderBy('invoice.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
