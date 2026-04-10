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
import { CardsService } from '../cards/cards.service';
import { TransactionsService } from '../transactions/transactions.service';
import { LockersService } from '../lockers/lockers.service';
import {
  CreateOrderWithUserDto,
  EditOrderDto,
  TakeOrderDto,
  TakeOrderWithUserDto,
} from './order.dto';
import { OrderError } from './order-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Status } from '../../common/enums';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private cardsService: CardsService,
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

  async editMyOrder(
    myId: number,
    orderId: number,
    dto: EditOrderDto,
  ): Promise<void> {
    const order = await this.throwIfNotOrderCustomer(orderId, myId);
    await this.editOrder(order, dto);
  }

  async editUserOrder(orderId: number, dto: EditOrderDto): Promise<void> {
    const order = await this.throwIfOrderNotFound(orderId);
    await this.editOrder(order, dto);
  }

  private async editOrder(order: Order, dto: EditOrderDto): Promise<void> {
    this.throwIfOrderNotCreated(order);
    if (order.sum < dto.sum) {
      await this.transactionsService.createDecreaseTransaction({
        userId: order.customerUserId,
        cardId: order.customerCardId,
        sum: dto.sum - order.sum,
        description: 'редагування замовлення',
      });
    }
    if (order.sum > dto.sum) {
      await this.transactionsService.createIncreaseTransaction({
        userId: order.customerUserId,
        cardId: order.customerCardId,
        sum: order.sum - dto.sum,
        description: 'редагування замовлення',
      });
    }
    await this.edit(order.id, dto);
  }

  async deleteMyOrder(myId: number, orderId: number): Promise<void> {
    const order = await this.throwIfNotOrderCustomer(orderId, myId);
    await this.deleteOrder(order);
  }

  async deleteUserOrder(orderId: number): Promise<void> {
    const order = await this.throwIfOrderNotFound(orderId);
    await this.deleteOrder(order);
  }

  private async deleteOrder(order: Order): Promise<void> {
    this.throwIfOrderNotCreated(order);
    await this.transactionsService.createIncreaseTransaction({
      userId: order.customerUserId,
      cardId: order.customerCardId,
      sum: order.sum,
      description: 'видалення замовлення',
    });
    await this.delete(order.id);
  }

  async takeMyOrder(
    myId: number,
    orderId: number,
    dto: TakeOrderDto,
  ): Promise<void> {
    await this.takeOrder(orderId, { ...dto, userId: myId });
  }

  async takeUserOrder(
    orderId: number,
    dto: TakeOrderWithUserDto,
  ): Promise<void> {
    await this.takeOrder(orderId, dto);
  }

  private async takeOrder(
    orderId: number,
    dto: TakeOrderWithUserDto,
  ): Promise<void> {
    await this.cardsService.throwIfNotCardUser(dto.cardId, dto.userId);
    const order = await this.throwIfOrderNotFound(orderId);
    this.throwIfOrderNotCreated(order);
    await this.take(orderId, dto);
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
  ): Promise<Order> {
    const order = await this.throwIfOrderNotFound(orderId);
    const isCardUser = await this.cardsService.isCardUser(
      order.customerCardId,
      userId,
    );
    if (!isCardUser) {
      throw new ForbiddenException(OrderError.NOT_CUSTOMER);
    }
    return order;
  }

  private throwIfOrderNotCreated(order: Order): void {
    this.throwIfOrderAlreadyTaken(order);
    this.throwIfOrderAlreadyExecuted(order);
    this.throwIfOrderAlreadyCompleted(order);
  }

  private throwIfOrderAlreadyTaken(order: Order): void {
    if (order.status === Status.TAKEN) {
      throw new BadRequestException(OrderError.ALREADY_TAKEN);
    }
  }

  private throwIfOrderAlreadyExecuted(order: Order): void {
    if (order.status === Status.EXECUTED) {
      throw new BadRequestException(OrderError.ALREADY_EXECUTED);
    }
  }

  private throwIfOrderAlreadyCompleted(order: Order): void {
    if (order.status === Status.COMPLETED) {
      throw new BadRequestException(OrderError.ALREADY_COMPLETED);
    }
  }

  private findOrderById(id: number): Promise<Order | null> {
    return this.ordersRepository.findOneBy({ id });
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

  private async edit(id: number, dto: EditOrderDto): Promise<void> {
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

  private async take(id: number, dto: TakeOrderWithUserDto): Promise<void> {
    try {
      await this.ordersRepository.update(
        { id },
        {
          status: Status.TAKEN,
          executorUserId: dto.userId,
          executorCardId: dto.cardId,
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(OrderError.TAKE_FAILED);
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
