import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import {
  CreateOrderDto,
  CreateOrderWithUserDto,
  EditOrderDto,
  OrderIdDto,
  TakeOrderDto,
  TakeOrderWithUserDto,
} from './order.dto';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Public()
  @Get()
  getMainOrders(@Query() req: Request): Promise<Response<Order>> {
    return this.ordersService.getMainOrders(req);
  }

  @Get('my')
  getMyOrders(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Order>> {
    return this.ordersService.getMyOrders(myId, req);
  }

  @Get('completed')
  getCompletedOrders(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Order>> {
    return this.ordersService.getCompletedOrders(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllOrders(@Query() req: Request): Promise<Response<Order>> {
    return this.ordersService.getAllOrders(req);
  }

  @Post()
  createMyOrder(
    @MyId() myId: number,
    @Body() dto: CreateOrderDto,
  ): Promise<void> {
    return this.ordersService.createOrder({ ...dto, userId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserOrder(@Body() dto: CreateOrderWithUserDto): Promise<void> {
    return this.ordersService.createOrder(dto);
  }

  @Patch(':orderId')
  editMyOrder(
    @MyId() myId: number,
    @Param() { orderId }: OrderIdDto,
    @Body() dto: EditOrderDto,
  ): Promise<void> {
    return this.ordersService.editMyOrder(myId, orderId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch('all/:orderId')
  editUserOrder(
    @Param() { orderId }: OrderIdDto,
    @Body() dto: EditOrderDto,
  ): Promise<void> {
    return this.ordersService.editUserOrder(orderId, dto);
  }

  @Delete(':orderId')
  deleteMyOrder(
    @MyId() myId: number,
    @Param() { orderId }: OrderIdDto,
  ): Promise<void> {
    return this.ordersService.deleteMyOrder(myId, orderId);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:orderId')
  deleteUserOrder(@Param() { orderId }: OrderIdDto): Promise<void> {
    return this.ordersService.deleteUserOrder(orderId);
  }

  @Post(':orderId/take')
  takeMyOrder(
    @MyId() myId: number,
    @Param() { orderId }: OrderIdDto,
    @Body() dto: TakeOrderDto,
  ): Promise<void> {
    return this.ordersService.takeMyOrder(myId, orderId, dto);
  }

  @Roles([Role.ADMIN])
  @Post('all/:orderId/take')
  takeUserOrder(
    @Param() { orderId }: OrderIdDto,
    @Body() dto: TakeOrderWithUserDto,
  ): Promise<void> {
    return this.ordersService.takeUserOrder(orderId, dto);
  }

  @Post(':orderId/cancel')
  cancelMyOrder(
    @MyId() myId: number,
    @Param() { orderId }: OrderIdDto,
  ): Promise<void> {
    return this.ordersService.cancelMyOrder(myId, orderId);
  }

  @Roles([Role.ADMIN])
  @Post('all/:orderId/cancel')
  cancelUserOrder(@Param() { orderId }: OrderIdDto): Promise<void> {
    return this.ordersService.cancelUserOrder(orderId);
  }

  @Post(':orderId/execute')
  executeMyOrder(
    @MyId() myId: number,
    @Param() { orderId }: OrderIdDto,
  ): Promise<void> {
    return this.ordersService.executeMyOrder(myId, orderId);
  }

  @Roles([Role.ADMIN])
  @Post('all/:orderId/execute')
  executeUserOrder(@Param() { orderId }: OrderIdDto): Promise<void> {
    return this.ordersService.executeUserOrder(orderId);
  }

  @Post(':orderId/complete')
  completeMyOrder(
    @MyId() myId: number,
    @Param() { orderId }: OrderIdDto,
  ): Promise<void> {
    return this.ordersService.completeMyOrder(myId, orderId);
  }

  @Roles([Role.ADMIN])
  @Post('all/:orderId/complete')
  completeUserOrder(@Param() { orderId }: OrderIdDto): Promise<void> {
    return this.ordersService.completeUserOrder(orderId);
  }
}
