import { Controller, Get, Query } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { Town } from './town.entity';
import { User } from '../users/user.entity';
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
}
