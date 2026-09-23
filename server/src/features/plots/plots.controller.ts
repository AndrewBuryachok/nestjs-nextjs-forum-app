import { Controller, Get, Query } from '@nestjs/common';
import { PlotsService } from './plots.service';
import { Plot } from './plot.entity';
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
}
