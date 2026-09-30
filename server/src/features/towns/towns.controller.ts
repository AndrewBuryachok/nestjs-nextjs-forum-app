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
import { TownsService } from './towns.service';
import { Town } from './town.entity';
import { User } from '../users/user.entity';
import {
  CreateTownDto,
  CreateTownWithUserDto,
  EditTownDto,
  TownIdDto,
} from './town.dto';
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

  @Public()
  @Get(':townId/users')
  selectTownUsers(@Param() { townId }: TownIdDto): Promise<User[]> {
    return this.townsService.selectTownUsers(townId);
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

  @Patch(':townId')
  editMyTown(
    @MyId() myId: number,
    @Param() { townId }: TownIdDto,
    @Body() dto: EditTownDto,
  ): Promise<void> {
    return this.townsService.editMyTown(myId, townId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch('all/:townId')
  editUserTown(
    @Param() { townId }: TownIdDto,
    @Body() dto: EditTownDto,
  ): Promise<void> {
    return this.townsService.editUserTown(townId, dto);
  }

  @Delete(':townId')
  deleteMyTown(
    @MyId() myId: number,
    @Param() { townId }: TownIdDto,
  ): Promise<void> {
    return this.townsService.deleteMyTown(myId, townId);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:townId')
  deleteUserTown(@Param() { townId }: TownIdDto): Promise<void> {
    return this.townsService.deleteUserTown(townId);
  }
}
