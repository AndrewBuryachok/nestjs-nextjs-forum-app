import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { Complaint } from './complaint.entity';
import {
  ComplaintIdDto,
  CreateComplaintDto,
  CreateComplaintMessageDto,
  CreateComplaintWithUserDto,
} from './complaint.dto';
import { MyId, Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('complaints')
export class ComplaintsController {
  constructor(private complaintsService: ComplaintsService) {}

  @Public()
  @Get()
  getMainComplaints(@Query() req: Request): Promise<Response<Complaint>> {
    return this.complaintsService.getMainComplaints(req);
  }

  @Public()
  @Get('closed')
  getClosedComplaints(@Query() req: Request): Promise<Response<Complaint>> {
    return this.complaintsService.getClosedComplaints(req);
  }

  @Get('my')
  getMyComplaints(
    @MyId() myId: number,
    @Query() req: Request,
  ): Promise<Response<Complaint>> {
    return this.complaintsService.getMyComplaints(myId, req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllComplaints(@Query() req: Request): Promise<Response<Complaint>> {
    return this.complaintsService.getAllComplaints(req);
  }

  @Public()
  @Get(':complaintId')
  getOneComplaint(
    @Param() { complaintId }: ComplaintIdDto,
  ): Promise<Complaint> {
    return this.complaintsService.getOneComplaint(complaintId);
  }

  @Post()
  createMyComplaint(
    @MyId() myId: number,
    @Body() dto: CreateComplaintDto,
  ): Promise<void> {
    return this.complaintsService.createComplaint({
      ...dto,
      senderUserId: myId,
    });
  }

  @Roles([Role.ADMIN])
  @Post('all')
  createUserComplaint(@Body() dto: CreateComplaintWithUserDto): Promise<void> {
    return this.complaintsService.createComplaint(dto);
  }

  @Post('messages')
  createComplaintMessage(
    @MyId() myId: number,
    @Body() dto: CreateComplaintMessageDto,
  ): Promise<void> {
    return this.complaintsService.createComplaintMessage(myId, dto);
  }
}
