import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LandmarksService } from './landmarks.service';
import { Landmark } from './landmark.entity';
import { CreateLandmarkDto, CreateLandmarkWithUserDto } from './landmark.dto';
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
}
