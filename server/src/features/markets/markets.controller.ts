import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MarketsService } from './markets.service';
import { Market } from './market.entity';
import { CreateMarketDto, CreateMarketWithUserDto } from './market.dto';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('markets')
export class MarketsController {
  constructor(private marketsService: MarketsService) {}

  @Public()
  @Get()
  getMainMarkets(@Query() req: Request): Promise<Response<Market>> {
    return this.marketsService.getMainMarkets(req);
  }

  @Get('my')
  getMyMarkets(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Market>> {
    return this.marketsService.getMyMarkets(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllMarkets(@Query() req: Request): Promise<Response<Market>> {
    return this.marketsService.getAllMarkets(req);
  }

  @Post()
  createMyMarket(
    @MyId() myId: number,
    @Body() dto: CreateMarketDto,
  ): Promise<void> {
    return this.marketsService.createMarket({ ...dto, userId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserMarket(@Body() dto: CreateMarketWithUserDto): Promise<void> {
    return this.marketsService.createMarket(dto);
  }
}
