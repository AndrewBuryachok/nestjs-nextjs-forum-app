import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TownsService } from './towns.service';
import { Town } from './town.entity';
import { CreateTownDto, CreateTownWithUserDto } from './town.dto';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('towns')
export class TownsController {
  constructor(private townsService: TownsService) {}

  @Public()
  @Get()
  getMainTowns(@Query() req: Request): Promise<Response<Town>> {
    return this.townsService.getMainTowns(req);
  }

  @Get('my')
  getMyTowns(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Town>> {
    return this.townsService.getMyTowns(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllTowns(@Query() req: Request): Promise<Response<Town>> {
    return this.townsService.getAllTowns(req);
  }

  @Post()
  createMyTown(
    @MyId() myId: number,
    @Body() dto: CreateTownDto,
  ): Promise<void> {
    return this.townsService.createTown({ ...dto, userId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserTown(@Body() dto: CreateTownWithUserDto): Promise<void> {
    return this.townsService.createTown(dto);
  }
}
