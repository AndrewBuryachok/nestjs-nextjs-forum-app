import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Order } from './order.entity';
import { Request, Response } from '../../common/interfaces';
import { Status } from '../../common/enums';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async getMainOrders(req: Request): Promise<Response<Order>> {
    const [data, total] = await this.getOrdersQueryBuilder(req)
      .where('order.status = :status', { status: Status.CREATED })
      .getManyAndCount();
    return { data, total };
  }

  async getMyOrders(myId: number, req: Request): Promise<Response<Order>> {
    const [data, total] = await this.getOrdersQueryBuilder(req)
      .innerJoin('customerCard.cardUsers', 'customerCardUsers')
      .where('customerCardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getTakenOrders(myId: number, req: Request): Promise<Response<Order>> {
    const [data, total] = await this.getOrdersQueryBuilder(req)
      .leftJoin('executorCard.cardUsers', 'executorCardUsers')
      .where('executorCardUsers.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllOrders(req: Request): Promise<Response<Order>> {
    const [data, total] =
      await this.getOrdersQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  private getOrdersQueryBuilder(req: Request): SelectQueryBuilder<Order> {
    return this.ordersRepository
      .createQueryBuilder('order')
      .select([
        'order.id',
        'order.item',
        'order.description',
        'order.amount',
        'order.batch',
        'order.unit',
        'order.sum',
        'order.status',
        'order.createdAt',
        'order.completedAt',
      ])
      .innerJoin('order.locker', 'locker')
      .addSelect(['locker.id', 'locker.name', 'locker.x', 'locker.y'])
      .innerJoin('order.customerUser', 'customerUser')
      .addSelect([
        'customerUser.id',
        'customerUser.nick',
        'customerUser.avatar',
      ])
      .innerJoin('order.customerCard', 'customerCard')
      .addSelect(['customerCard.id', 'customerCard.name'])
      .leftJoin('order.executorUser', 'executorUser')
      .addSelect([
        'executorUser.id',
        'executorUser.nick',
        'executorUser.avatar',
      ])
      .leftJoin('order.executorCard', 'executorCard')
      .addSelect(['executorCard.id', 'executorCard.name'])
      .orderBy('order.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
