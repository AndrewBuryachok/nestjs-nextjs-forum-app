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
import { TownChunk } from './town-chunk.entity';
import {
  CreateTownDto,
  CreateTownWithUserDto,
  EditTownDto,
  TownIdDto,
  UpdateTownChunkDto,
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
  @Get('all/select')
  selectAllTowns(): Promise<Town[]> {
    return this.townsService.selectAllTowns();
  }

  @Public()
  @Get(':townId/chunks')
  selectTownChunks(@Param() { townId }: TownIdDto): Promise<TownChunk[]> {
    return this.townsService.selectTownChunks(townId);
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

  @Post(':townId/chunks')
  addMyTownChunk(
    @MyId() myId: number,
    @Param() { townId }: TownIdDto,
    @Body() dto: UpdateTownChunkDto,
  ): Promise<void> {
    return this.townsService.addMyTownChunk(myId, townId, dto);
  }

  @Roles([Role.ADMIN])
  @Post('all/:townId/chunks')
  addUserTownChunk(
    @Param() { townId }: TownIdDto,
    @Body() dto: UpdateTownChunkDto,
  ): Promise<void> {
    return this.townsService.addUserTownChunk(townId, dto);
  }

  @Delete(':townId/chunks')
  removeMyTownChunk(
    @MyId() myId: number,
    @Param() { townId }: TownIdDto,
    @Body() dto: UpdateTownChunkDto,
  ): Promise<void> {
    return this.townsService.removeMyTownChunk(myId, townId, dto);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:townId/chunks')
  removeUserTownChunk(
    @Param() { townId }: TownIdDto,
    @Body() dto: UpdateTownChunkDto,
  ): Promise<void> {
    return this.townsService.removeUserTownChunk(townId, dto);
  }
}
