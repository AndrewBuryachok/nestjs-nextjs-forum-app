import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ForumService } from './forum.service';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';
import { Transaction } from '../transactions/transaction.entity';
import { Fine } from '../fines/fine.entity';
import { Product } from '../products/product.entity';
import { Locker } from '../lockers/locker.entity';
import { Order } from '../orders/order.entity';
import { UserIdDto, UserNickDto } from '../users/user.dto';
import {
  CardIdDto,
  CreateCardDto,
  EditCardDto,
  UpdateCardUserDto,
} from '../cards/card.dto';
import { CreateTransferDto } from '../transactions/transaction.dto';
import { FineIdDto, PayFineDto } from '../fines/fine.dto';
import { CreateOrderDto, OrderIdDto, TakeOrderDto } from '../orders/order.dto';
import { Public } from '../../common/decorators';
import { ForumApiKeyGuard } from '../../common/guards';
import { Request, Response } from '../../common/interfaces';

@Public()
@UseGuards(ForumApiKeyGuard)
@Controller('forum')
export class ForumController {
  constructor(private forumService: ForumService) {}

  @Get(':nick/auth')
  selectOneUser(@Param() { nick }: UserNickDto): Promise<User> {
    return this.forumService.selectOneUser(nick);
  }

  @Get(':userId/users/all/select')
  selectAllUsers(): Promise<User[]> {
    return this.forumService.selectAllUsers();
  }

  @Get(':userId/cards/my')
  getMyCards(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Card>> {
    return this.forumService.getMyCards(userId, req);
  }

  @Get(':userId/cards/my/select')
  selectMyCards(@Param() { userId }: UserIdDto): Promise<Card[]> {
    return this.forumService.selectMyCards(userId);
  }

  @Get(':myId/cards/:userId/select')
  selectUserCards(@Param() { userId }: UserIdDto): Promise<Card[]> {
    return this.forumService.selectUserCards(userId);
  }

  @Get(':myId/cards/:cardId/users')
  selectCardUsers(@Param() { cardId }: CardIdDto): Promise<User[]> {
    return this.forumService.selectCardUsers(cardId);
  }

  @Get(':myId/cards/:cardId/not-users')
  selectNotCardUsers(@Param() { cardId }: CardIdDto): Promise<User[]> {
    return this.forumService.selectNotCardUsers(cardId);
  }

  @Post(':userId/cards')
  createCard(
    @Param() { userId }: UserIdDto,
    @Body() dto: CreateCardDto,
  ): Promise<void> {
    return this.forumService.createCard(userId, dto);
  }

  @Patch(':userId/cards/:cardId')
  editCard(
    @Param() { userId }: UserIdDto,
    @Param() { cardId }: CardIdDto,
    @Body() dto: EditCardDto,
  ): Promise<void> {
    return this.forumService.editCard(userId, cardId, dto);
  }

  @Post(':userId/cards/:cardId')
  addCardUser(
    @Param() { userId }: UserIdDto,
    @Param() { cardId }: CardIdDto,
    @Body() dto: UpdateCardUserDto,
  ): Promise<void> {
    return this.forumService.addCardUser(userId, cardId, dto);
  }

  @Delete(':userId/cards/:cardId')
  removeCardUser(
    @Param() { userId }: UserIdDto,
    @Param() { cardId }: CardIdDto,
    @Body() dto: UpdateCardUserDto,
  ): Promise<void> {
    return this.forumService.removeCardUser(userId, cardId, dto);
  }

  @Get(':userId/transactions/my')
  getMyTransactions(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Transaction>> {
    return this.forumService.getMyTransactions(userId, req);
  }

  @Post(':userId/transactions/transfer')
  createTransferTransaction(
    @Param() { userId }: UserIdDto,
    @Body() dto: CreateTransferDto,
  ): Promise<void> {
    return this.forumService.createTransferTransaction(userId, dto);
  }

  @Get(':userId/fines/my')
  getMyFines(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Fine>> {
    return this.forumService.getMyFines(userId, req);
  }

  @Get(':userId/fines/paid')
  getPaidFines(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Fine>> {
    return this.forumService.getPaidFines(userId, req);
  }

  @Post(':userId/fines/:fineId')
  payFine(
    @Param() { userId }: UserIdDto,
    @Param() { fineId }: FineIdDto,
    @Body() dto: PayFineDto,
  ): Promise<void> {
    return this.forumService.payFine(userId, fineId, dto);
  }

  @Get(':userId/products')
  getMainProducts(@Query() req: Request): Promise<Response<Product>> {
    return this.forumService.getMainProducts(req);
  }

  @Get(':userId/products/my')
  getMyProducts(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Product>> {
    return this.forumService.getMyProducts(userId, req);
  }

  @Get(':userId/lockers/all/select')
  selectAllLockers(): Promise<Locker[]> {
    return this.forumService.selectAllLockers();
  }

  @Get(':userId/orders')
  getMainOrders(@Query() req: Request): Promise<Response<Order>> {
    return this.forumService.getMainOrders(req);
  }

  @Get(':userId/orders/my')
  getMyOrders(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Order>> {
    return this.forumService.getMyOrders(userId, req);
  }

  @Get(':userId/orders/completed')
  getCompletedOrders(
    @Param() { userId }: UserIdDto,
    @Query() req: Request,
  ): Promise<Response<Order>> {
    return this.forumService.getCompletedOrders(userId, req);
  }

  @Post(':userId/orders')
  createOrder(
    @Param() { userId }: UserIdDto,
    @Body() dto: CreateOrderDto,
  ): Promise<void> {
    return this.forumService.createOrder(userId, dto);
  }

  @Delete(':userId/orders/:orderId')
  deleteOrder(
    @Param() { userId }: UserIdDto,
    @Param() { orderId }: OrderIdDto,
  ): Promise<void> {
    return this.forumService.deleteOrder(userId, orderId);
  }

  @Post(':userId/orders/:orderId/take')
  takeOrder(
    @Param() { userId }: UserIdDto,
    @Param() { orderId }: OrderIdDto,
    @Body() dto: TakeOrderDto,
  ): Promise<void> {
    return this.forumService.takeOrder(userId, orderId, dto);
  }

  @Post(':userId/orders/:orderId/cancel')
  cancelMyOrder(
    @Param() { userId }: UserIdDto,
    @Param() { orderId }: OrderIdDto,
  ): Promise<void> {
    return this.forumService.cancelOrder(userId, orderId);
  }

  @Post(':userId/orders/:orderId/execute')
  executeMyOrder(
    @Param() { userId }: UserIdDto,
    @Param() { orderId }: OrderIdDto,
  ): Promise<void> {
    return this.forumService.executeOrder(userId, orderId);
  }

  @Post(':userId/orders/:orderId/complete')
  completeOrder(
    @Param() { userId }: UserIdDto,
    @Param() { orderId }: OrderIdDto,
  ): Promise<void> {
    return this.forumService.completeOrder(userId, orderId);
  }
}
