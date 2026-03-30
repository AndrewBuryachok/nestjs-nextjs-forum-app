import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { Purchase } from './purchase.entity';
import { CreatePurchaseDto } from './purchase.dto';
import { MyId, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('purchases')
export class PurchasesController {
  constructor(private purchasesService: PurchasesService) {}

  @Get('my')
  getMyPurchases(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Purchase>> {
    return this.purchasesService.getMyPurchases(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllPurchases(@Query() req: Request): Promise<Response<Purchase>> {
    return this.purchasesService.getAllPurchases(req);
  }

  @Post()
  createMyPurchase(
    @MyId() myId: number,
    @Body() dto: CreatePurchaseDto,
  ): Promise<void> {
    return this.purchasesService.createPurchase({ ...dto, myId, isAll: false });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserPurchase(
    @MyId() myId: number,
    @Body() dto: CreatePurchaseDto,
  ): Promise<void> {
    return this.purchasesService.createPurchase({ ...dto, myId, isAll: true });
  }
}
