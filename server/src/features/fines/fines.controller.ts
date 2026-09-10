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
import {
  CreateFineDto,
  CreateFineWithUserDto,
  EditFineDto,
  FineIdDto,
  PayFineDto,
} from './fine.dto';
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

  @Roles([Role.ADMIN])
  @Get('all')
  getAllFines(@Query() req: Request): Promise<Response<Fine>> {
    return this.finesService.getAllFines(req);
  }

  @Post()
  createMyFine(
    @MyId() myId: number,
    @Body() dto: CreateFineDto,
  ): Promise<void> {
    return this.finesService.createFine({ ...dto, senderUserId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserFine(@Body() dto: CreateFineWithUserDto): Promise<void> {
    return this.finesService.createFine(dto);
  }

  @Patch(':fineId')
  editMyFine(
    @MyId() myId: number,
    @Param() { fineId }: FineIdDto,
    @Body() dto: EditFineDto,
  ): Promise<void> {
    return this.finesService.editMyFine(myId, fineId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch('all/:fineId')
  editUserFine(
    @Param() { fineId }: FineIdDto,
    @Body() dto: EditFineDto,
  ): Promise<void> {
    return this.finesService.editUserFine(fineId, dto);
  }

  @Delete(':fineId')
  deleteMyFine(
    @MyId() myId: number,
    @Param() { fineId }: FineIdDto,
  ): Promise<void> {
    return this.finesService.deleteMyFine(myId, fineId);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:fineId')
  deleteUserFine(@Param() { fineId }: FineIdDto): Promise<void> {
    return this.finesService.deleteUserFine(fineId);
  }

  @Post(':fineId')
  payMyFine(
    @MyId() myId: number,
    @Param() { fineId }: FineIdDto,
    @Body() dto: PayFineDto,
  ): Promise<void> {
    return this.finesService.payMyFine(myId, fineId, dto);
  }

  @Roles([Role.ADMIN])
  @Post('all/:fineId')
  payUserFine(
    @Param() { fineId }: FineIdDto,
    @Body() dto: PayFineDto,
  ): Promise<void> {
    return this.finesService.payUserFine(fineId, dto);
  }
}
