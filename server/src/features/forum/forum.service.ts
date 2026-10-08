import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CardsService } from '../cards/cards.service';
import { TransactionsService } from '../transactions/transactions.service';
import { FinesService } from '../fines/fines.service';
import { ProductsService } from '../products/products.service';
import { LockersService } from '../lockers/lockers.service';
import { OrdersService } from '../orders/orders.service';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Fine } from '../fines/fine.entity';
import { Product } from '../products/product.entity';
import { Locker } from '../lockers/locker.entity';
import { Order } from '../orders/order.entity';
import {
  CreateCardDto,
  EditCardDto,
  UpdateCardUserDto,
} from '../cards/card.dto';
import { CreateTransferDto } from '../transactions/transaction.dto';
import { PayFineDto } from '../fines/fine.dto';
import { CreateOrderDto, TakeOrderDto } from '../orders/order.dto';
import { Request, Response } from '../../common/interfaces';
import { TransactionType } from '../../common/enums';

@Injectable()
export class ForumService {
  constructor(
    private usersService: UsersService,
    private cardsService: CardsService,
    private transactionsService: TransactionsService,
    private finesService: FinesService,
    private productsService: ProductsService,
    private lockersService: LockersService,
    private ordersService: OrdersService,
  ) {}

  selectOneUser(nick: string): Promise<User> {
    return this.usersService.selectOneUserByNick(nick);
  }

  selectAllUsers(): Promise<User[]> {
    return this.usersService.selectAllUsers();
  }

  getMyCards(myId: number, req: Request): Promise<Response<Card>> {
    return this.cardsService.getMyCards(myId, req);
  }

  selectMyCards(myId: number): Promise<Card[]> {
    return this.cardsService.selectUserCardsWithBalance(myId);
  }

  selectUserCards(userId: number): Promise<Card[]> {
    return this.cardsService.selectUserCards(userId);
  }

  selectCardUsers(cardId: number): Promise<User[]> {
    return this.cardsService.selectCardUsers(cardId);
  }

  selectNotCardUsers(cardId: number): Promise<User[]> {
    return this.cardsService.selectNotCardUsers(cardId);
  }

  createCard(myId: number, dto: CreateCardDto): Promise<void> {
    return this.cardsService.createCard({ ...dto, userId: myId });
  }

  editCard(myId: number, cardId: number, dto: EditCardDto): Promise<void> {
    return this.cardsService.editMyCard(myId, cardId, dto);
  }

  addCardUser(
    myId: number,
    cardId: number,
    dto: UpdateCardUserDto,
  ): Promise<void> {
    return this.cardsService.addMyCardUser(myId, cardId, dto);
  }

  removeCardUser(
    myId: number,
    cardId: number,
    dto: UpdateCardUserDto,
  ): Promise<void> {
    return this.cardsService.removeMyCardUser(myId, cardId, dto);
  }

  getMyTransactions(
    myId: number,
    req: Request,
  ): Promise<Response<Transaction>> {
    return this.transactionsService.getMyTransactions(myId, req);
  }

  createTransferTransaction(
    myId: number,
    dto: CreateTransferDto,
  ): Promise<void> {
    return this.transactionsService.createTransferTransaction({
      ...dto,
      senderUserId: myId,
      type: TransactionType.TRANSFER,
    });
  }

  getMyFines(myId: number, req: Request): Promise<Response<Fine>> {
    return this.finesService.getMyFines(myId, req);
  }

  getPaidFines(myId: number, req: Request): Promise<Response<Fine>> {
    return this.finesService.getPaidFines(myId, req);
  }

  payFine(myId: number, fineId: number, dto: PayFineDto): Promise<void> {
    return this.finesService.payMyFine(myId, fineId, dto);
  }

  getMainProducts(req: Request): Promise<Response<Product>> {
    return this.productsService.getMainProducts(req);
  }

  getMyProducts(myId: number, req: Request): Promise<Response<Product>> {
    return this.productsService.getMyProducts(myId, req);
  }

  selectAllLockers(): Promise<Locker[]> {
    return this.lockersService.selectAllLockers();
  }

  getMainOrders(req: Request): Promise<Response<Order>> {
    return this.ordersService.getMainOrders(req);
  }

  getMyOrders(myId: number, req: Request): Promise<Response<Order>> {
    return this.ordersService.getMyOrders(myId, req);
  }

  getCompletedOrders(myId: number, req: Request): Promise<Response<Order>> {
    return this.ordersService.getCompletedOrders(myId, req);
  }

  createOrder(myId: number, dto: CreateOrderDto): Promise<void> {
    return this.ordersService.createOrder({ ...dto, userId: myId });
  }

  deleteOrder(myId: number, orderId: number): Promise<void> {
    return this.ordersService.deleteMyOrder(myId, orderId);
  }

  takeOrder(myId: number, orderId: number, dto: TakeOrderDto): Promise<void> {
    return this.ordersService.takeMyOrder(myId, orderId, dto);
  }

  cancelOrder(myId: number, orderId: number): Promise<void> {
    return this.ordersService.cancelMyOrder(myId, orderId);
  }

  executeOrder(myId: number, orderId: number): Promise<void> {
    return this.ordersService.executeMyOrder(myId, orderId);
  }

  completeOrder(myId: number, orderId: number): Promise<void> {
    return this.ordersService.completeMyOrder(myId, orderId);
  }
}
