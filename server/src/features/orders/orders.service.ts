import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { Order } from './order.entity';
import { MqttService } from '../mqtt/mqtt.service';
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
import { Notification, Status, TransactionType } from '../../common/enums';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private mqttService: MqttService,
    private cardsService: CardsService,
    private transactionsService: TransactionsService,
    private lockersService: LockersService,
  ) {}

  async getMainOrders(req: Request): Promise<Response<Order>> {
    const [data, total] = await this.getOrdersQueryBuilder(req)
      .andWhere('order.status = :status', { status: Status.CREATED })
      .getManyAndCount();
    return { data, total };
  }

  async getMyOrders(myId: number, req: Request): Promise<Response<Order>> {
    const [data, total] = await this.getOrdersQueryBuilder(req)
      .innerJoin('customerCard.cardUsers', 'customerCardUsers')
      .leftJoin('executorCard.cardUsers', 'executorCardUsers')
      .andWhere(
        new Brackets((qb) =>
          qb
            .where('customerCardUsers.userId = :myId')
            .orWhere('executorCardUsers.userId = :myId'),
        ),
        { myId },
      )
      .getManyAndCount();
    return { data, total };
  }

  async getAllOrders(req: Request): Promise<Response<Order>> {
    const [data, total] =
      await this.getOrdersQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  @Transactional()
  async createOrder(dto: CreateOrderWithUserDto): Promise<void> {
    await this.lockersService.throwIfLockerNotFound(dto.lockerId);
    await this.transactionsService.createDecreaseTransaction({
      userId: dto.userId,
      cardId: dto.cardId,
      type: TransactionType.CREATE_ORDER,
      sum: dto.sum,
      description: dto.description,
      item: dto.item,
    });
    const order = await this.create(dto);
    this.mqttService.publishNotification(
      dto.userId,
      0,
      order.id,
      Notification.CREATE_ORDER,
    );
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

  @Transactional()
  private async editOrder(order: Order, dto: EditOrderDto): Promise<void> {
    this.throwIfOrderNotCreated(order);
    if (order.sum < dto.sum) {
      await this.transactionsService.createDecreaseTransaction({
        userId: order.customerUserId,
        cardId: order.customerCardId,
        type: TransactionType.EDIT_ORDER,
        sum: dto.sum - order.sum,
        description: dto.description,
        item: dto.item,
      });
    }
    if (order.sum > dto.sum) {
      await this.transactionsService.createIncreaseTransaction({
        userId: order.customerUserId,
        cardId: order.customerCardId,
        type: TransactionType.EDIT_ORDER,
        sum: order.sum - dto.sum,
        description: dto.description,
        item: dto.item,
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

  @Transactional()
  private async deleteOrder(order: Order): Promise<void> {
    this.throwIfOrderNotCreated(order);
    await this.transactionsService.createIncreaseTransaction({
      userId: order.customerUserId,
      cardId: order.customerCardId,
      type: TransactionType.DELETE_ORDER,
      sum: order.sum,
      description: order.description,
      item: order.item,
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
    this.mqttService.publishNotification(
      dto.userId,
      order.customerUserId,
      orderId,
      Notification.TAKE_ORDER,
    );
  }

  async cancelMyOrder(myId: number, orderId: number): Promise<void> {
    const order = await this.throwIfNotOrderExecutor(orderId, myId);
    await this.cancelOrder(order);
  }

  async cancelUserOrder(orderId: number): Promise<void> {
    const order = await this.throwIfOrderNotFound(orderId);
    await this.cancelOrder(order);
  }

  private async cancelOrder(order: Order): Promise<void> {
    this.throwIfOrderNotTaken(order);
    await this.cancel(order.id);
    this.mqttService.publishNotification(
      order.executorUserId!,
      order.customerUserId,
      order.id,
      Notification.CANCEL_ORDER,
    );
  }

  async executeMyOrder(myId: number, orderId: number): Promise<void> {
    const order = await this.throwIfNotOrderExecutor(orderId, myId);
    await this.executeOrder(order);
  }

  async executeUserOrder(orderId: number): Promise<void> {
    const order = await this.throwIfOrderNotFound(orderId);
    await this.executeOrder(order);
  }

  private async executeOrder(order: Order): Promise<void> {
    this.throwIfOrderNotTaken(order);
    await this.execute(order.id);
    this.mqttService.publishNotification(
      order.executorUserId!,
      order.customerUserId,
      order.id,
      Notification.EXECUTE_ORDER,
    );
  }

  async completeMyOrder(myId: number, orderId: number): Promise<void> {
    const order = await this.throwIfNotOrderCustomer(orderId, myId);
    await this.completeOrder(order);
  }

  async completeUserOrder(orderId: number): Promise<void> {
    const order = await this.throwIfOrderNotFound(orderId);
    await this.completeOrder(order);
  }

  @Transactional()
  private async completeOrder(order: Order): Promise<void> {
    this.throwIfOrderNotExecuted(order);
    await this.transactionsService.createIncreaseTransaction({
      userId: order.customerUserId,
      cardId: order.customerCardId,
      type: TransactionType.COMPLETE_ORDER,
      sum: order.sum,
      description: order.description,
      item: order.item,
    });
    await this.transactionsService.createTransferTransaction({
      senderUserId: order.customerUserId,
      senderCardId: order.customerCardId,
      receiverUserId: order.executorUserId!,
      receiverCardId: order.executorCardId!,
      type: TransactionType.EXECUTE_ORDER,
      sum: order.sum,
      description: order.description,
      item: order.item,
    });
    await this.complete(order.id);
    this.mqttService.publishNotification(
      order.customerUserId,
      order.executorUserId!,
      order.id,
      Notification.COMPLETE_ORDER,
    );
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
    if (order.customerUserId !== userId) {
      throw new ForbiddenException(OrderError.NOT_CUSTOMER);
    }
    return order;
  }

  async throwIfNotOrderExecutor(
    orderId: number,
    userId: number,
  ): Promise<Order> {
    const order = await this.throwIfOrderNotFound(orderId);
    if (order.executorUserId !== userId) {
      throw new ForbiddenException(OrderError.NOT_EXECUTOR);
    }
    return order;
  }

  private throwIfOrderNotCreated(order: Order): void {
    this.throwIfOrderAlreadyTaken(order);
    this.throwIfOrderAlreadyExecuted(order);
    this.throwIfOrderAlreadyCompleted(order);
  }

  private throwIfOrderNotTaken(order: Order): void {
    this.throwIfOrderAlreadyExecuted(order);
    this.throwIfOrderAlreadyCompleted(order);
    if (order.status !== Status.TAKEN) {
      throw new BadRequestException(OrderError.NOT_TAKEN);
    }
  }

  private throwIfOrderNotExecuted(order: Order): void {
    this.throwIfOrderAlreadyCompleted(order);
    if (order.status !== Status.EXECUTED) {
      throw new BadRequestException(OrderError.NOT_EXECUTED);
    }
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

  private async cancel(id: number): Promise<void> {
    try {
      await this.ordersRepository.update(
        { id },
        { status: Status.CREATED, executorUserId: null, executorCardId: null },
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

  private async complete(id: number): Promise<void> {
    try {
      await this.ordersRepository.update(
        { id },
        { status: Status.COMPLETED, completedAt: new Date() },
      );
    } catch (error) {
      throw new InternalServerErrorException(OrderError.COMPLETE_FAILED);
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
      .where(
        new Brackets(
          (qb) => req.id && qb.where('order.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb
              .where('order.customerUserId = :userId')
              .orWhere('order.executorUserId = :userId'),
        ),
        { userId: req.user },
      )
      .orderBy('order.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
