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
import { PlotsService } from './plots.service';
import { Plot } from './plot.entity';
import {
  CreatePlotDto,
  CreatePlotWithUserDto,
  EditPlotDto,
  PlotIdDto,
} from './plot.dto';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('plots')
export class PlotsController {
  constructor(private plotsService: PlotsService) {}

  @Public()
  @Get()
  getMainPlots(@Query() req: Request): Promise<Response<Plot>> {
    return this.plotsService.getMainPlots(req);
  }

  @Get('my')
  getMyPlots(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Plot>> {
    return this.plotsService.getMyPlots(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllPlots(@Query() req: Request): Promise<Response<Plot>> {
    return this.plotsService.getAllPlots(req);
  }

  @Post()
  createMyPlot(
    @MyId() myId: number,
    @Body() dto: CreatePlotDto,
  ): Promise<void> {
    return this.plotsService.createPlot({ ...dto, userId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserPlot(@Body() dto: CreatePlotWithUserDto): Promise<void> {
    return this.plotsService.createPlot(dto);
  }

  @Patch(':plotId')
  editMyPlot(
    @MyId() myId: number,
    @Param() { plotId }: PlotIdDto,
    @Body() dto: EditPlotDto,
  ): Promise<void> {
    return this.plotsService.editMyPlot(myId, plotId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch('all/:plotId')
  editUserPlot(
    @Param() { plotId }: PlotIdDto,
    @Body() dto: EditPlotDto,
  ): Promise<void> {
    return this.plotsService.editUserPlot(plotId, dto);
  }

  @Delete(':plotId')
  deleteMyPlot(
    @MyId() myId: number,
    @Param() { plotId }: PlotIdDto,
  ): Promise<void> {
    return this.plotsService.deleteMyPlot(myId, plotId);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:plotId')
  deleteUserPlot(@Param() { plotId }: PlotIdDto): Promise<void> {
    return this.plotsService.deleteUserPlot(plotId);
  }
}
