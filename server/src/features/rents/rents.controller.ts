import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RentsService } from './rents.service';
import { Rent } from './rent.entity';
import { CreateRentDto, CreateRentWithUserDto, RentIdDto } from './rent.dto';
import { UserIdDto } from '../users/user.dto';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('rents')
export class RentsController {
  constructor(private rentsService: RentsService) {}

  @Public()
  @Get()
  getMainRents(@Query() req: Request): Promise<Response<Rent>> {
    return this.rentsService.getMainRents(req);
  }

  @Get('my')
  getMyRents(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Rent>> {
    return this.rentsService.getMyRents(myId, req);
  }

  @Get('completed')
  getCompletedRents(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Rent>> {
    return this.rentsService.getCompletedRents(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllRents(@Query() req: Request): Promise<Response<Rent>> {
    return this.rentsService.getAllRents(req);
  }

  @Get('my/select')
  selectMyRents(@MyId() myId: number): Promise<Rent[]> {
    return this.rentsService.selectUserRents(myId);
  }

  @Public()
  @Get(':userId/select')
  selectUserRents(@Param() { userId }: UserIdDto): Promise<Rent[]> {
    return this.rentsService.selectUserRents(userId);
  }

  @Post()
  createMyRent(
    @MyId() myId: number,
    @Body() dto: CreateRentDto,
  ): Promise<void> {
    return this.rentsService.createRent({ ...dto, userId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserRent(@Body() dto: CreateRentWithUserDto): Promise<void> {
    return this.rentsService.createRent(dto);
  }

  @Post(':rentId')
  continueMyRent(
    @MyId() myId: number,
    @Param() { rentId }: RentIdDto,
  ): Promise<void> {
    return this.rentsService.continueMyRent(myId, rentId);
  }

  @Roles([Role.ADMIN])
  @Post('all/:rentId')
  continueUserRent(@Param() { rentId }: RentIdDto): Promise<void> {
    return this.rentsService.continueUserRent(rentId);
  }

  @Delete(':rentId')
  completeMyRent(
    @MyId() myId: number,
    @Param() { rentId }: RentIdDto,
  ): Promise<void> {
    return this.rentsService.completeMyRent(myId, rentId);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:rentId')
  completeUserRent(@Param() { rentId }: RentIdDto): Promise<void> {
    return this.rentsService.completeUserRent(rentId);
  }
}
