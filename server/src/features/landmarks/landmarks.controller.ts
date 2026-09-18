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
import { LandmarksService } from './landmarks.service';
import { Landmark } from './landmark.entity';
import {
  CreateLandmarkDto,
  CreateLandmarkWithUserDto,
  EditLandmarkDto,
  LandmarkIdDto,
} from './landmark.dto';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('landmarks')
export class LandmarksController {
  constructor(private landmarksService: LandmarksService) {}

  @Public()
  @Get()
  getMainLandmarks(@Query() req: Request): Promise<Response<Landmark>> {
    return this.landmarksService.getMainLandmarks(req);
  }

  @Get('my')
  getMyLandmarks(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Landmark>> {
    return this.landmarksService.getMyLandmarks(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllLandmarks(@Query() req: Request): Promise<Response<Landmark>> {
    return this.landmarksService.getAllLandmarks(req);
  }

  @Post()
  createMyLandmark(
    @MyId() myId: number,
    @Body() dto: CreateLandmarkDto,
  ): Promise<void> {
    return this.landmarksService.createLandmark({ ...dto, userId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserLandmark(@Body() dto: CreateLandmarkWithUserDto): Promise<void> {
    return this.landmarksService.createLandmark(dto);
  }

  @Patch(':landmarkId')
  editMyLandmark(
    @MyId() myId: number,
    @Param() { landmarkId }: LandmarkIdDto,
    @Body() dto: EditLandmarkDto,
  ): Promise<void> {
    return this.landmarksService.editMyLandmark(myId, landmarkId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch('all/:landmarkId')
  editUserLandmark(
    @Param() { landmarkId }: LandmarkIdDto,
    @Body() dto: EditLandmarkDto,
  ): Promise<void> {
    return this.landmarksService.editUserLandmark(landmarkId, dto);
  }

  @Delete(':landmarkId')
  deleteMyLandmark(
    @MyId() myId: number,
    @Param() { landmarkId }: LandmarkIdDto,
  ): Promise<void> {
    return this.landmarksService.deleteMyLandmark(myId, landmarkId);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:landmarkId')
  deleteUserLandmark(@Param() { landmarkId }: LandmarkIdDto): Promise<void> {
    return this.landmarksService.deleteUserLandmark(landmarkId);
  }
}
