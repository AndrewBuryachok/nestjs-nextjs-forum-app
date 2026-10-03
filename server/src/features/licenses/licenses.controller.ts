import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { User } from '../users/user.entity';
import { UserIdDto } from '../users/user.dto';
import { Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('licenses')
export class LicensesController {
  constructor(private licensesService: LicensesService) {}

  @Public()
  @Get()
  getMainLicenses(@Query() req: Request): Promise<Response<User>> {
    return this.licensesService.getMainLicenses(req);
  }

  @Roles([Role.ECONOMIST])
  @Post(':userId')
  createLicense(@Param() { userId }: UserIdDto): Promise<void> {
    return this.licensesService.createLicense(userId);
  }

  @Roles([Role.ECONOMIST])
  @Delete(':userId')
  deleteLicense(@Param() { userId }: UserIdDto): Promise<void> {
    return this.licensesService.deleteLicense(userId);
  }
}
