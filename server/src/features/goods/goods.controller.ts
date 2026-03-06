import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { Good } from './good.entity';
import { CreateGoodDto } from './good.dto';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}

  @Public()
  @Get()
  getMainGoods(@Query() req: Request): Promise<Response<Good>> {
    return this.goodsService.getMainGoods(req);
  }

  @Get('my')
  getMyGoods(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Good>> {
    return this.goodsService.getMyGoods(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllGoods(@Query() req: Request): Promise<Response<Good>> {
    return this.goodsService.getAllGoods(req);
  }

  @Post()
  createMyGood(
    @MyId() myId: number,
    @Body() dto: CreateGoodDto,
  ): Promise<void> {
    return this.goodsService.createGood({ ...dto, myId, isAll: false });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserGood(
    @MyId() myId: number,
    @Body() dto: CreateGoodDto,
  ): Promise<void> {
    return this.goodsService.createGood({ ...dto, myId, isAll: true });
  }
}
