import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RentsService } from './rents.service';
import { Rent } from './rent.entity';
import { CreateRentDto, CreateRentWithUserDto } from './rent.dto';
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
}
