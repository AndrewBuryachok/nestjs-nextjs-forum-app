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
import { MarketsService } from './markets.service';
import { Market } from './market.entity';
import {
  CreateMarketDto,
  CreateMarketWithUserDto,
  EditMarketDto,
  MarketIdDto,
} from './market.dto';
import { UserIdDto } from '../users/user.dto';
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

  @Get('my/select')
  selectMyMarkets(@MyId() myId: number): Promise<Market[]> {
    return this.marketsService.selectUserMarkets(myId);
  }

  @Public()
  @Get(':userId/select')
  selectUserMarkets(@Param() { userId }: UserIdDto): Promise<Market[]> {
    return this.marketsService.selectUserMarkets(userId);
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

  @Patch(':marketId')
  editMyMarket(
    @MyId() myId: number,
    @Param() { marketId }: MarketIdDto,
    @Body() dto: EditMarketDto,
  ): Promise<void> {
    return this.marketsService.editMyMarket(myId, marketId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch('all/:marketId')
  editUserMarket(
    @Param() { marketId }: MarketIdDto,
    @Body() dto: EditMarketDto,
  ): Promise<void> {
    return this.marketsService.editUserMarket(marketId, dto);
  }

  @Delete(':marketId')
  deleteMyMarket(
    @MyId() myId: number,
    @Param() { marketId }: MarketIdDto,
  ): Promise<void> {
    return this.marketsService.deleteMyMarket(myId, marketId);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:marketId')
  deleteUserMarket(@Param() { marketId }: MarketIdDto): Promise<void> {
    return this.marketsService.deleteUserMarket(marketId);
  }
}
