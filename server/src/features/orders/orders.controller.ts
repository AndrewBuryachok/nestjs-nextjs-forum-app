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
import { CreateOrderDto, EditOrderDto, OrderIdDto } from './order.dto';
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

  @Get('taken')
  getTakenOrders(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Order>> {
    return this.ordersService.getTakenOrders(myId, req);
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
    return this.ordersService.createOrder({ ...dto, myId, isAll: false });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserOrder(
    @MyId() myId: number,
    @Body() dto: CreateOrderDto,
  ): Promise<void> {
    return this.ordersService.createOrder({ ...dto, myId, isAll: true });
  }

  @Patch(':orderId')
  editMyOrder(
    @MyId() myId: number,
    @Param() { orderId }: OrderIdDto,
    @Body() dto: EditOrderDto,
  ): Promise<void> {
    return this.ordersService.editOrder({
      ...dto,
      orderId,
      myId,
      isAll: false,
    });
  }

  @Roles([Role.ADMIN])
  @Patch('all/:orderId')
  editUserOrder(
    @MyId() myId: number,
    @Param() { orderId }: OrderIdDto,
    @Body() dto: EditOrderDto,
  ): Promise<void> {
    return this.ordersService.editOrder({ ...dto, orderId, myId, isAll: true });
  }

  @Delete(':orderId')
  deleteMyOrder(
    @MyId() myId: number,
    @Param() { orderId }: OrderIdDto,
  ): Promise<void> {
    return this.ordersService.deleteOrder({ orderId, myId, isAll: false });
  }

  @Roles([Role.ADMIN])
  @Delete('all/:orderId')
  deleteUserOrder(
    @MyId() myId: number,
    @Param() { orderId }: OrderIdDto,
  ): Promise<void> {
    return this.ordersService.deleteOrder({ orderId, myId, isAll: true });
  }
}
