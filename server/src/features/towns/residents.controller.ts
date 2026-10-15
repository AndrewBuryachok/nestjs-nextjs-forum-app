import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { User } from '../users/user.entity';
import { TownIdDto } from './town.dto';
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
  @Get(':townId/select')
  selectTownResidents(@Param() { townId }: TownIdDto): Promise<User[]> {
    return this.residentsService.selectTownResidents(townId);
  }
}
