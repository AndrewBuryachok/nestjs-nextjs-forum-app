import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Complaint } from './complaint.entity';
import { ComplaintMessage } from './complaint-message.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { UsersService } from '../users/users.service';
import {
  CreateComplaintMessageDto,
  CreateComplaintWithUserDto,
} from './complaint.dto';
import { ComplaintError } from './complaint-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private complaintsRepository: Repository<Complaint>,
    @InjectRepository(ComplaintMessage)
    private complaintsMessagesRepository: Repository<ComplaintMessage>,
    private mqttService: MqttService,
    private usersService: UsersService,
  ) {}

  async getMainComplaints(req: Request): Promise<Response<Complaint>> {
    const [data, total] = await this.getComplaintsQueryBuilder(req)
      .andWhere('complaint.closedAt IS NULL')
      .getManyAndCount();
    return { data, total };
  }

  async getClosedComplaints(req: Request): Promise<Response<Complaint>> {
    const [data, total] = await this.getComplaintsQueryBuilder(req)
      .andWhere('complaint.closedAt IS NOT NULL')
      .getManyAndCount();
    return { data, total };
  }

  async getMyComplaints(
    myId: number,
    req: Request,
  ): Promise<Response<Complaint>> {
    const [data, total] = await this.getComplaintsQueryBuilder(req)
      .andWhere('complaint.closedAt IS NULL')
      .andWhere(
        new Brackets((qb) =>
          qb.where('senderUser.id = :myId').orWhere('receiverUser.id = :myId'),
        ),
        { myId },
      )
      .getManyAndCount();
    return { data, total };
  }

  async getAllComplaints(req: Request): Promise<Response<Complaint>> {
    const [data, total] =
      await this.getComplaintsQueryBuilder(req).getManyAndCount();
    return { data, total };
  }

  async getOneComplaint(id: number): Promise<Complaint> {
    return this.getComplaintsQueryBuilder({ id })
      .leftJoin('complaint.messages', 'message')
      .addSelect(['message.id', 'message.text', 'message.createdAt'])
      .leftJoin('message.user', 'messageUser')
      .addSelect(['messageUser.id', 'messageUser.nick', 'messageUser.avatar'])
      .getOneOrFail();
  }

  async createComplaint(dto: CreateComplaintWithUserDto): Promise<void> {
    await this.usersService.throwIfUserNotFound(dto.senderUserId);
    await this.usersService.throwIfUserNotFound(dto.receiverUserId);
    const complaint = await this.create(dto);
    this.mqttService.publishNotification(
      dto.senderUserId,
      dto.receiverUserId,
      complaint.id,
      Notification.CREATE_COMPLAINT,
    );
  }

  async createComplaintMessage(
    myId: number,
    dto: CreateComplaintMessageDto,
  ): Promise<void> {
    const complaint = await this.throwIfNotComplaintUser(dto.complaintId, myId);
    this.throwIfComplaintAlreadyClosed(complaint);
    await this.createMessage(myId, dto);
    const userId =
      complaint.senderUserId === myId
        ? complaint.receiverUserId
        : complaint.senderUserId;
    this.mqttService.publishNotification(
      myId,
      userId,
      dto.complaintId,
      Notification.MESSAGE_COMPLAINT,
    );
  }

  async throwIfComplaintNotFound(complaintId: number): Promise<Complaint> {
    const complaint = await this.findComplaintById(complaintId);
    if (!complaint) {
      throw new NotFoundException(ComplaintError.NOT_FOUND);
    }
    return complaint;
  }

  async throwIfNotComplaintUser(
    complaintId: number,
    userId: number,
  ): Promise<Complaint> {
    const complaint = await this.throwIfComplaintNotFound(complaintId);
    if (
      complaint.senderUserId !== userId &&
      complaint.receiverUserId !== userId
    ) {
      throw new ForbiddenException(ComplaintError.NOT_USER);
    }
    return complaint;
  }

  private throwIfComplaintAlreadyClosed(complaint: Complaint): void {
    if (complaint.closedAt) {
      throw new BadRequestException(ComplaintError.ALREADY_CLOSED);
    }
  }

  private findComplaintById(id: number): Promise<Complaint | null> {
    return this.complaintsRepository.findOneBy({ id });
  }

  private async create(dto: CreateComplaintWithUserDto): Promise<Complaint> {
    try {
      const complaint = this.complaintsRepository.create({
        senderUserId: dto.senderUserId,
        receiverUserId: dto.receiverUserId,
        title: dto.title,
      });
      await this.complaintsRepository.save(complaint);
      return complaint;
    } catch (error) {
      throw new InternalServerErrorException(ComplaintError.CREATE_FAILED);
    }
  }

  private async createMessage(
    myId: number,
    dto: CreateComplaintMessageDto,
  ): Promise<ComplaintMessage> {
    try {
      const complaintMessage = this.complaintsMessagesRepository.create({
        complaintId: dto.complaintId,
        userId: myId,
        text: dto.text,
      });
      await this.complaintsMessagesRepository.save(complaintMessage);
      return complaintMessage;
    } catch (error) {
      throw new InternalServerErrorException(
        ComplaintError.CREATE_MESSAGE_FAILED,
      );
    }
  }

  private getComplaintsQueryBuilder(
    req: Request,
  ): SelectQueryBuilder<Complaint> {
    return this.complaintsRepository
      .createQueryBuilder('complaint')
      .select([
        'complaint.id',
        'complaint.title',
        'complaint.createdAt',
        'complaint.closedAt',
      ])
      .innerJoin('complaint.senderUser', 'senderUser')
      .addSelect(['senderUser.id', 'senderUser.nick', 'senderUser.avatar'])
      .innerJoin('complaint.receiverUser', 'receiverUser')
      .addSelect([
        'receiverUser.id',
        'receiverUser.nick',
        'receiverUser.avatar',
      ])
      .leftJoin('complaint.judgeUser', 'judgeUser')
      .addSelect(['judgeUser.id', 'judgeUser.nick', 'judgeUser.avatar'])
      .where(
        new Brackets(
          (qb) => req.id && qb.where('complaint.id = :id', { id: req.id }),
        ),
      )
      .andWhere(
        new Brackets(
          (qb) =>
            req.user &&
            qb
              .where('complaint.senderUserId = :userId')
              .orWhere('complaint.receiverUserId = :userId'),
        ),
        { userId: req.user },
      )
      .orderBy('complaint.id', 'DESC')
      .skip(req.skip)
      .take(req.take);
  }
}
