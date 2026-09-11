import { Controller, Get, Param, Query } from '@nestjs/common';
import { ForumService } from './forum.service';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Fine } from '../fines/fine.entity';
import { Shop } from '../shops/shop.entity';
import { Product } from '../products/product.entity';
import { Purchase } from '../purchases/purchase.entity';
import { Locker } from '../lockers/locker.entity';
import { Order } from '../orders/order.entity';
import { UserNickDto } from '../users/user.dto';
import { Public } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';

@Controller('forum')
export class ForumController {
  constructor(private forumService: ForumService) {}

  @Public()
  @Get(':nick/auth')
  selectSingleUser(@Param() { nick }: UserNickDto): Promise<User> {
    return this.forumService.selectSingleUser(nick);
  }

  @Public()
  @Get(':userId/cards/my')
  getMyCards(
    @Param() { userId }: { userId: number },
    @Query() req: Request,
  ): Promise<Response<Card>> {
    return this.forumService.getMyCards(userId, req);
  }

  @Public()
  @Get(':userId/transactions/my')
  getMyTransactions(
    @Param() { userId }: { userId: number },
    @Query() req: Request,
  ): Promise<Response<Transaction>> {
    return this.forumService.getMyTransactions(userId, req);
  }

  @Public()
  @Get(':userId/fines/my')
  getMyFines(
    @Param() { userId }: { userId: number },
    @Query() req: Request,
  ): Promise<Response<Fine>> {
    return this.forumService.getMyFines(userId, req);
  }

  @Public()
  @Get(':userId/fines/paid')
  getPaidFines(
    @Param() { userId }: { userId: number },
    @Query() req: Request,
  ): Promise<Response<Fine>> {
    return this.forumService.getPaidFines(userId, req);
  }

  @Public()
  @Get(':userId/shops')
  getMainShops(@Query() req: Request): Promise<Response<Shop>> {
    return this.forumService.getMainShops(req);
  }

  @Public()
  @Get(':userId/shops/my')
  getMyShops(
    @Param() { userId }: { userId: number },
    @Query() req: Request,
  ): Promise<Response<Shop>> {
    return this.forumService.getMyShops(userId, req);
  }

  @Public()
  @Get(':userId/products')
  getMainProducts(@Query() req: Request): Promise<Response<Product>> {
    return this.forumService.getMainProducts(req);
  }

  @Public()
  @Get(':userId/products/my')
  getMyProducts(
    @Param() { userId }: { userId: number },
    @Query() req: Request,
  ): Promise<Response<Product>> {
    return this.forumService.getMyProducts(userId, req);
  }

  @Public()
  @Get(':userId/purchases/my')
  getMyPurchases(
    @Param() { userId }: { userId: number },
    @Query() req: Request,
  ): Promise<Response<Purchase>> {
    return this.forumService.getMyPurchases(userId, req);
  }

  @Public()
  @Get(':userId/lockers')
  getMainLockers(@Query() req: Request): Promise<Response<Locker>> {
    return this.forumService.getMainLockers(req);
  }

  @Public()
  @Get(':userId/lockers/my')
  getMyLockers(
    @Param() { userId }: { userId: number },
    @Query() req: Request,
  ): Promise<Response<Locker>> {
    return this.forumService.getMyLockers(userId, req);
  }

  @Public()
  @Get(':userId/orders')
  getMainOrders(@Query() req: Request): Promise<Response<Order>> {
    return this.forumService.getMainOrders(req);
  }

  @Public()
  @Get(':userId/orders/my')
  getMyOrders(
    @Param() { userId }: { userId: number },
    @Query() req: Request,
  ): Promise<Response<Order>> {
    return this.forumService.getMyOrders(userId, req);
  }

  @Public()
  @Get(':userId/orders/completed')
  getCompletedOrders(
    @Param() { userId }: { userId: number },
    @Query() req: Request,
  ): Promise<Response<Order>> {
    return this.forumService.getCompletedOrders(userId, req);
  }
}
