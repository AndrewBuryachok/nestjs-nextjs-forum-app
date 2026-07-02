import { Controller, Get, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Invoice } from './invoice.entity';
import { MyId, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get('my')
  getMyInvoices(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Invoice>> {
    return this.invoicesService.getMyInvoices(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllInvoices(@Query() req: Request): Promise<Response<Invoice>> {
    return this.invoicesService.getAllInvoices(req);
  }
}
