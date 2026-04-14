import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Order } from './order.entity';
import { LockersService } from '../lockers/lockers.service';
import { CardsService } from '../cards/cards.service';
import { TransactionsService } from '../transactions/transactions.service';
import {
  CancelOrderDto,
  DeleteOrderDto,
  ExecuteOrderDto,
  ExtCreateOrderDto,
  ExtEditOrderDto,
  ExtTakeOrderDto,
} from './order.dto';
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

  async editOrder(dto: ExtEditOrderDto): Promise<void> {
    const order = await this.throwIfNotOrderCustomer(
      dto.orderId,
      dto.myId,
      dto.isAll,
    );
    this.throwIfOrderAlreadyTaken(order);
    if (order.sum < dto.sum) {
      await this.transactionsService.createDecreaseTransaction({
        cardId: order.customerCardId,
        sum: dto.sum - order.sum,
        description: 'редагування замовлення',
        myId: dto.myId,
      });
    }
    if (order.sum > dto.sum) {
      await this.transactionsService.createIncreaseTransaction({
        cardId: order.customerCardId,
        sum: order.sum - dto.sum,
        description: 'редагування замовлення',
        myId: dto.myId,
      });
    }
    await this.edit(dto.orderId, dto);
  }

  async deleteOrder(dto: DeleteOrderDto): Promise<void> {
    const order = await this.throwIfNotOrderCustomer(
      dto.orderId,
      dto.myId,
      dto.isAll,
    );
    this.throwIfOrderAlreadyTaken(order);
    await this.transactionsService.createIncreaseTransaction({
      cardId: order.customerCardId,
      sum: order.sum,
      description: 'видалення замовлення',
      myId: dto.myId,
    });
    await this.delete(dto.orderId);
  }

  async takeOrder(dto: ExtTakeOrderDto): Promise<void> {
    await this.cardsService.throwIfNotCardUser(dto.cardId, dto.myId, dto.isAll);
    const order = await this.throwIfOrderNotFound(dto.orderId);
    this.throwIfOrderAlreadyTaken(order);
    await this.take(dto.orderId, dto);
  }

  async cancelOrder(dto: CancelOrderDto): Promise<void> {
    const order = await this.throwIfNotOrderExecutor(
      dto.orderId,
      dto.myId,
      dto.isAll,
    );
    this.throwIfOrderNotTaken(order);
    await this.cancel(dto.orderId);
  }

  async executeOrder(dto: ExecuteOrderDto): Promise<void> {
    const order = await this.throwIfNotOrderExecutor(
      dto.orderId,
      dto.myId,
      dto.isAll,
    );
    this.throwIfOrderNotTaken(order);
    await this.execute(dto.orderId);
  }

  async throwIfOrderNotFound(orderId: number): Promise<Order> {
    const order = await this.findOrderById(orderId);
    if (!order) {
      throw new NotFoundException(OrderError.NOT_FOUND);
    }
    return order;
  }

  async throwIfNotOrderCustomer(
    orderId: number,
    userId: number,
    isAll: boolean,
  ): Promise<Order> {
    const order = await this.throwIfOrderNotFound(orderId);
    const isCardUser = await this.cardsService.isCardUser(
      order.customerCardId,
      userId,
      isAll,
    );
    if (!isCardUser) {
      throw new ForbiddenException(OrderError.NOT_CUSTOMER);
    }
    return order;
  }

  async throwIfNotOrderExecutor(
    orderId: number,
    userId: number,
    isAll: boolean,
  ): Promise<Order> {
    const order = await this.throwIfOrderNotFound(orderId);
    const isCardUser =
      !!order.executorCardId &&
      (await this.cardsService.isCardUser(order.executorCardId, userId, isAll));
    if (!isCardUser) {
      throw new ForbiddenException(OrderError.NOT_EXECUTOR);
    }
    return order;
  }

  private throwIfOrderAlreadyTaken(order: Order): void {
    if (order.status !== Status.CREATED) {
      throw new BadRequestException(OrderError.ALREADY_TAKEN);
    }
  }

  private throwIfOrderNotTaken(order: Order): void {
    if (order.status !== Status.TAKEN) {
      throw new BadRequestException(OrderError.NOT_TAKEN);
    }
  }

  private findOrderById(id: number): Promise<Order | null> {
    return this.ordersRepository.findOneBy({ id });
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

  private async edit(id: number, dto: ExtEditOrderDto): Promise<void> {
    try {
      await this.ordersRepository.update(
        { id },
        {
          item: dto.item,
          description: dto.description,
          amount: dto.amount,
          batch: dto.batch,
          unit: dto.unit,
          sum: dto.sum,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(OrderError.EDIT_FAILED);
    }
  }

  private async delete(id: number): Promise<void> {
    try {
      await this.ordersRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException(OrderError.DELETE_FAILED);
    }
  }

  private async take(id: number, dto: ExtTakeOrderDto): Promise<void> {
    try {
      await this.ordersRepository.update(
        { id },
        { executorCardId: dto.cardId, status: Status.TAKEN },
      );
    } catch (error) {
      throw new InternalServerErrorException(OrderError.TAKE_FAILED);
    }
  }

  private async cancel(id: number): Promise<void> {
    try {
      await this.ordersRepository.update(
        { id },
        { executorCardId: null, status: Status.CREATED },
      );
    } catch (error) {
      throw new InternalServerErrorException(OrderError.CANCEL_FAILED);
    }
  }

  private async execute(id: number): Promise<void> {
    try {
      await this.ordersRepository.update({ id }, { status: Status.EXECUTED });
    } catch (error) {
      throw new InternalServerErrorException(OrderError.EXECUTE_FAILED);
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
