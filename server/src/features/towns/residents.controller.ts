import { Controller, Get, Param } from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { User } from '../users/user.entity';
import { TownIdDto } from './town.dto';
import { Public } from '../../common/decorators';

@Controller('residents')
export class ResidentsController {
  constructor(private residentsService: ResidentsService) {}

  @Public()
  @Get(':townId/select')
  selectTownResidents(@Param() { townId }: TownIdDto): Promise<User[]> {
    return this.residentsService.selectTownResidents(townId);
  }
}
