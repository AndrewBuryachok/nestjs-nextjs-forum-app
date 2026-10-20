import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { User } from '../users/user.entity';
import { TownIdDto } from './town.dto';
import { UserIdDto } from '../users/user.dto';
import { MyId, Public } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';

@Controller('residents')
export class ResidentsController {
  constructor(private residentsService: ResidentsService) {}

  @Get('my')
  getMyResidents(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<User>> {
    return this.residentsService.getMyResidents(myId, req);
  }

  @Public()
  @Get('not/select')
  selectNotResidents(): Promise<User[]> {
    return this.residentsService.selectNotResidents();
  }

  @Public()
  @Get(':townId/select')
  selectTownResidents(@Param() { townId }: TownIdDto): Promise<User[]> {
    return this.residentsService.selectTownResidents(townId);
  }

  @Delete(':userId')
  deleteResident(
    @MyId() myId: number,
    @Param() { userId }: UserIdDto,
  ): Promise<void> {
    return this.residentsService.deleteResident(myId, userId);
  }
}
