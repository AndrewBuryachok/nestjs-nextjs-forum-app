import { Controller, Get, Query } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { Shop } from './shop.entity';
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
}
