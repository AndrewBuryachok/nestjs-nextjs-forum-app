import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CardsService } from '../cards/cards.service';
import { TransactionsService } from '../transactions/transactions.service';
import { InvoicesService } from '../invoices/invoices.service';
import { ShopsService } from '../shops/shops.service';
import { ProductsService } from '../products/products.service';
import { PurchasesService } from '../purchases/purchases.service';
import { LockersService } from '../lockers/lockers.service';
import { OrdersService } from '../orders/orders.service';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Invoice } from '../invoices/invoice.entity';
import { Shop } from '../shops/shop.entity';
import { Product } from '../products/product.entity';
import { Purchase } from '../purchases/purchase.entity';
import { Locker } from '../lockers/locker.entity';
import { Order } from '../orders/order.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class ForumService {
  constructor(
    private usersService: UsersService,
    private cardsService: CardsService,
    private transactionsService: TransactionsService,
    private invoicesService: InvoicesService,
    private shopsService: ShopsService,
    private productsService: ProductsService,
    private purchasesService: PurchasesService,
    private lockersService: LockersService,
    private ordersService: OrdersService,
  ) {}

  selectSingleUser(nick: string): Promise<User> {
    return this.usersService.selectUserByNick(nick);
  }

  getMyCards(myId: number, req: Request): Promise<Response<Card>> {
    return this.cardsService.getMyCards(myId, req);
  }

  getMyTransactions(
    myId: number,
    req: Request,
  ): Promise<Response<Transaction>> {
    return this.transactionsService.getMyTransactions(myId, req);
  }

  getMyInvoices(myId: number, req: Request): Promise<Response<Invoice>> {
    return this.invoicesService.getMyInvoices(myId, req);
  }

  getMainShops(req: Request): Promise<Response<Shop>> {
    return this.shopsService.getMainShops(req);
  }

  getMyShops(myId: number, req: Request): Promise<Response<Shop>> {
    return this.shopsService.getMyShops(myId, req);
  }

  getMainProducts(req: Request): Promise<Response<Product>> {
    return this.productsService.getMainProducts(req);
  }

  getMyProducts(myId: number, req: Request): Promise<Response<Product>> {
    return this.productsService.getMyProducts(myId, req);
  }

  getMyPurchases(myId: number, req: Request): Promise<Response<Purchase>> {
    return this.purchasesService.getMyPurchases(myId, req);
  }

  getMainLockers(req: Request): Promise<Response<Locker>> {
    return this.lockersService.getMainLockers(req);
  }

  getMyLockers(myId: number, req: Request): Promise<Response<Locker>> {
    return this.lockersService.getMyLockers(myId, req);
  }

  getMainOrders(req: Request): Promise<Response<Order>> {
    return this.ordersService.getMainOrders(req);
  }

  getMyOrders(myId: number, req: Request): Promise<Response<Order>> {
    return this.ordersService.getMyOrders(myId, req);
  }

  getTakenOrders(myId: number, req: Request): Promise<Response<Order>> {
    return this.ordersService.getTakenOrders(myId, req);
  }
}
