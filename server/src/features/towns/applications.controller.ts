import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { Town } from './town.entity';
import { User } from '../users/user.entity';
import { CreateApplicationDto } from './application.dto';
import { TownIdDto } from './town.dto';
import { UserIdDto } from '../users/user.dto';
import { MyId } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Get('sent')
  getSentApplications(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Town>> {
    return this.applicationsService.getSentApplications(myId, req);
  }

  @Get('received')
  getReceivedApplications(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<User>> {
    return this.applicationsService.getReceivedApplications(myId, req);
  }

  @Post()
  createApplication(
    @MyId() myId: number,
    @Body() dto: CreateApplicationDto,
  ): Promise<void> {
    return this.applicationsService.createApplication(myId, dto);
  }

  @Delete(':townId')
  deleteApplication(
    @MyId() myId: number,
    @Param() { townId }: TownIdDto,
  ): Promise<void> {
    return this.applicationsService.deleteApplication(myId, townId);
  }

  @Post(':userId/accept')
  acceptApplication(
    @MyId() myId: number,
    @Param() { userId }: UserIdDto,
  ): Promise<void> {
    return this.applicationsService.acceptApplication(myId, userId);
  }

  @Post(':userId/reject')
  rejectApplication(
    @MyId() myId: number,
    @Param() { userId }: UserIdDto,
  ): Promise<void> {
    return this.applicationsService.rejectApplication(myId, userId);
  }
}
