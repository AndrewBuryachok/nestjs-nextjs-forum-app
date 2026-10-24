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
import { FinesService } from './fines.service';
import { Fine } from './fine.entity';
import { CreateFineDto, EditFineDto, FineIdDto, PayFineDto } from './fine.dto';
import { MyId, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('fines')
export class FinesController {
  constructor(private finesService: FinesService) {}

  @Get('my')
  getMyFines(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Fine>> {
    return this.finesService.getMyFines(myId, req);
  }

  @Get('paid')
  getPaidFines(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Fine>> {
    return this.finesService.getPaidFines(myId, req);
  }

  @Roles([Role.ADMIN, Role.INSPECTOR, Role.JUDGE])
  @Get('all')
  getAllFines(@Query() req: Request): Promise<Response<Fine>> {
    return this.finesService.getAllFines(req);
  }

  @Roles([Role.ADMIN, Role.INSPECTOR, Role.JUDGE])
  @Post()
  createFine(@Body() dto: CreateFineDto): Promise<void> {
    return this.finesService.createFine(dto);
  }

  @Roles([Role.ADMIN, Role.INSPECTOR, Role.JUDGE])
  @Patch(':fineId')
  editFine(
    @Param() { fineId }: FineIdDto,
    @Body() dto: EditFineDto,
  ): Promise<void> {
    return this.finesService.editFine(fineId, dto);
  }

  @Roles([Role.ADMIN, Role.INSPECTOR, Role.JUDGE])
  @Delete(':fineId')
  deleteFine(@Param() { fineId }: FineIdDto): Promise<void> {
    return this.finesService.deleteFine(fineId);
  }

  @Post(':fineId')
  payFine(
    @MyId() myId: number,
    @Param() { fineId }: FineIdDto,
    @Body() dto: PayFineDto,
  ): Promise<void> {
    return this.finesService.payFine(myId, fineId, dto);
  }
}
