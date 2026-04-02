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
import { LockersService } from './lockers.service';
import { Locker } from './locker.entity';
import {
  CreateLockerDto,
  CreateLockerWithUserDto,
  EditLockerDto,
  LockerIdDto,
} from './locker.dto';
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
  createUserLocker(@Body() dto: CreateLockerWithUserDto): Promise<void> {
    return this.lockersService.createLocker(dto);
  }

  @Patch(':lockerId')
  editMyLocker(
    @MyId() myId: number,
    @Param() { lockerId }: LockerIdDto,
    @Body() dto: EditLockerDto,
  ): Promise<void> {
    return this.lockersService.editMyLocker(myId, lockerId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch('all/:lockerId')
  editUserLocker(
    @Param() { lockerId }: LockerIdDto,
    @Body() dto: EditLockerDto,
  ): Promise<void> {
    return this.lockersService.editUserLocker(lockerId, dto);
  }

  @Delete(':lockerId')
  deleteMyLocker(
    @MyId() myId: number,
    @Param() { lockerId }: LockerIdDto,
  ): Promise<void> {
    return this.lockersService.deleteMyLocker(myId, lockerId);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:lockerId')
  deleteUserLocker(@Param() { lockerId }: LockerIdDto): Promise<void> {
    return this.lockersService.deleteUserLocker(lockerId);
  }
}
