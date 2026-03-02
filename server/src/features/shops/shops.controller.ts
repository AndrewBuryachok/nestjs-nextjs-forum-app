import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { Shop } from './shop.entity';
import { CreateShopDto } from './shop.dto';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Public()
  @Get()
  getMainShops(@Query() req: Request): Promise<Response<Shop>> {
    return this.shopsService.getMainShops(req);
  }

  @Get('my')
  getMyShops(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Shop>> {
    return this.shopsService.getMyShops(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllShops(@Query() req: Request): Promise<Response<Shop>> {
    return this.shopsService.getAllShops(req);
  }

  @Post()
  createMyShop(
    @MyId() myId: number,
    @Body() dto: CreateShopDto,
  ): Promise<void> {
    return this.shopsService.createShop({ ...dto, myId, isAll: false });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserShop(
    @MyId() myId: number,
    @Body() dto: CreateShopDto,
  ): Promise<void> {
    return this.shopsService.createShop({ ...dto, myId, isAll: true });
  }
}
