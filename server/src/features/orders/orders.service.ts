import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Order } from './order.entity';
import { LockersService } from '../lockers/lockers.service';
import { CardsService } from '../cards/cards.service';
import { TransactionsService } from '../transactions/transactions.service';
import { ExtCreateOrderDto } from './order.dto';
import { OrderError } from './order-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Status } from '../../common/enums';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private lockersService: LockersService,
    private cardsService: CardsService,
    private transactionsService: TransactionsService,
  ) {}

  async getMainOrders(req: Request): Promise<Response<Order>> {
    const [data, total] = await this.getOrdersQueryBuilder(req)
      .where('order.status = :status', { status: Status.CREATED })
      .getManyAndCount();
    return { data, total };
  }

  async getMyOrders(myId: number, req: Request): Promise<Response<Order>> {
    const [data, total] = await this.getOrdersQueryBuilder(req)
      .innerJoin('customerAccount.cards', 'customerCards')
      .where('customerCards.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getTakenOrders(myId: number, req: Request): Promise<Response<Order>> {
    const [data, total] = await this.getOrdersQueryBuilder(req)
      .leftJoin('executorAccount.cards', 'executorCards')
      .where('executorCards.userId = :myId', { myId })
      .getManyAndCount();
    return { data, total };
  }

  async getAllOrders(req: Request): Promise<Response<Order>> {
    const [data, total] =
      await this.getOrdersQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async createOrder(dto: ExtCreateOrderDto): Promise<void> {
    await this.lockersService.throwIfLockerNotFound(dto.lockerId);
    const card = await this.cardsService.throwIfNotCardUser(
      dto.cardId,
      dto.myId,
      dto.isAll,
    );
    await this.transactionsService.createDecreaseTransaction({
      cardId: dto.cardId,
      sum: dto.sum,
      description: 'створення замовлення',
      myId: card.userId,
    });
    await this.create(dto);
  }

  private async create(dto: ExtCreateOrderDto): Promise<Order> {
    try {
      const order = this.ordersRepository.create({
        lockerId: dto.lockerId,
        customerCardId: dto.cardId,
        item: dto.item,
        description: dto.description,
        amount: dto.amount,
        batch: dto.batch,
        unit: dto.unit,
        sum: dto.sum,
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
      .innerJoin('order.customerCard', 'customerCard')
      .addSelect(['customerCard.id'])
      .innerJoin('customerCard.account', 'customerAccount')
      .addSelect(['customerAccount.id', 'customerAccount.name'])
      .innerJoin('customerCard.user', 'customerUser')
      .addSelect([
        'customerUser.id',
        'customerUser.nick',
        'customerUser.avatar',
      ])
      .leftJoin('order.executorCard', 'executorCard')
      .addSelect(['executorCard.id'])
      .leftJoin('executorCard.account', 'executorAccount')
      .addSelect(['executorAccount.id', 'executorAccount.name'])
      .leftJoin('executorCard.user', 'executorUser')
      .addSelect([
        'executorUser.id',
        'executorUser.nick',
        'executorUser.avatar',
      ])
      .orderBy('order.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
