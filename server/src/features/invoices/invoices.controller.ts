import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto, CreateInvoiceWithUserDto } from './invoice.dto';
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

  @Post()
  createMyInvoice(
    @MyId() myId: number,
    @Body() dto: CreateInvoiceDto,
  ): Promise<void> {
    return this.invoicesService.createInvoice({ ...dto, senderUserId: myId });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserInvoice(@Body() dto: CreateInvoiceWithUserDto): Promise<void> {
    return this.invoicesService.createInvoice(dto);
  }
}
