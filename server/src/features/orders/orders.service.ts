import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Order } from './order.entity';
import { TransactionsService } from '../transactions/transactions.service';
import { LockersService } from '../lockers/lockers.service';
import { CreateOrderWithUserDto } from './order.dto';
import { OrderError } from './order-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Status } from '../../common/enums';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private transactionsService: TransactionsService,
    private lockersService: LockersService,
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

  async createOrder(dto: CreateOrderWithUserDto): Promise<void> {
    await this.lockersService.throwIfLockerNotFound(dto.lockerId);
    await this.transactionsService.createDecreaseTransaction({
      userId: dto.userId,
      cardId: dto.cardId,
      sum: dto.sum,
      description: 'створення замовлення',
    });
    await this.create(dto);
  }

  private async create(dto: CreateOrderWithUserDto): Promise<Order> {
    try {
      const order = this.ordersRepository.create({
        lockerId: dto.lockerId,
        customerUserId: dto.userId,
        customerCardId: dto.cardId,
        item: dto.item,
        description: dto.description,
        amount: dto.amount,
        batch: dto.batch,
        unit: dto.unit,
        sum: dto.sum,
        status: Status.CREATED,
      });
      await this.ordersRepository.save(order);
      return order;
    } catch (error) {
      throw new InternalServerErrorException(OrderError.CREATE_FAILED);
    }
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
