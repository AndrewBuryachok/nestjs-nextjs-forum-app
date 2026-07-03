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
import { InvoicesService } from './invoices.service';
import { Invoice } from './invoice.entity';
import {
  CreateInvoiceDto,
  CreateInvoiceWithUserDto,
  EditInvoiceDto,
  InvoiceIdDto,
} from './invoice.dto';
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

  @Patch(':invoiceId')
  editMyInvoice(
    @MyId() myId: number,
    @Param() { invoiceId }: InvoiceIdDto,
    @Body() dto: EditInvoiceDto,
  ): Promise<void> {
    return this.invoicesService.editMyInvoice(myId, invoiceId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch('all/:invoiceId')
  editUserInvoice(
    @Param() { invoiceId }: InvoiceIdDto,
    @Body() dto: EditInvoiceDto,
  ): Promise<void> {
    return this.invoicesService.editUserInvoice(invoiceId, dto);
  }

  @Delete(':invoiceId')
  deleteMyInvoice(
    @MyId() myId: number,
    @Param() { invoiceId }: InvoiceIdDto,
  ): Promise<void> {
    return this.invoicesService.deleteMyInvoice(myId, invoiceId);
  }

  @Roles([Role.ADMIN])
  @Delete('all/:invoiceId')
  deleteUserInvoice(@Param() { invoiceId }: InvoiceIdDto): Promise<void> {
    return this.invoicesService.deleteUserInvoice(invoiceId);
  }
}
