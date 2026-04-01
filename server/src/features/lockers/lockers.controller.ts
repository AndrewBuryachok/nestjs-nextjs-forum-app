import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LockersService } from './lockers.service';
import { Locker } from './locker.entity';
import { CreateLockerDto, ExtCreateLockerDto } from './locker.dto';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('lockers')
export class LockersController {
  constructor(private lockersService: LockersService) {}

  @Public()
  @Get()
  getMainLockers(@Query() req: Request): Promise<Response<Locker>> {
    return this.lockersService.getMainLockers(req);
  }

  @Get('my')
  getMyLockers(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Locker>> {
    return this.lockersService.getMyLockers(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllLockers(@Query() req: Request): Promise<Response<Locker>> {
    return this.lockersService.getAllLockers(req);
  }

  @Post()
  createMyLocker(
    @MyId() myId: number,
    @Body() dto: CreateLockerDto,
  ): Promise<void> {
    return this.lockersService.createLocker({ ...dto, userId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserLocker(@Body() dto: ExtCreateLockerDto): Promise<void> {
    return this.lockersService.createLocker(dto);
  }
}
