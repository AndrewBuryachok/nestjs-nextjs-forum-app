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
import { GoodsService } from './goods.service';
import { Good } from './good.entity';
import { CreateGoodDto, EditGoodDto, GoodIdDto } from './good.dto';
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

  @Patch(':goodId')
  editMyGood(
    @MyId() myId: number,
    @Param() { goodId }: GoodIdDto,
    @Body() dto: EditGoodDto,
  ): Promise<void> {
    return this.goodsService.editGood({ ...dto, goodId, myId, isAll: false });
  }

  @Roles([Role.ADMIN])
  @Patch('all/:goodId')
  editUserGood(
    @MyId() myId: number,
    @Param() { goodId }: GoodIdDto,
    @Body() dto: EditGoodDto,
  ): Promise<void> {
    return this.goodsService.editGood({ ...dto, goodId, myId, isAll: true });
  }

  @Delete(':goodId')
  deleteMyGood(
    @MyId() myId: number,
    @Param() { goodId }: GoodIdDto,
  ): Promise<void> {
    return this.goodsService.deleteGood({ goodId, myId, isAll: false });
  }

  @Roles([Role.ADMIN])
  @Delete('all/:goodId')
  deleteUserGood(
    @MyId() myId: number,
    @Param() { goodId }: GoodIdDto,
  ): Promise<void> {
    return this.goodsService.deleteGood({ goodId, myId, isAll: true });
  }
}
