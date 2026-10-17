import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Application } from './application.entity';
import { MqttService } from '../mqtt/mqtt.service';
import { TownsService } from './towns.service';
import { ResidentsService } from './residents.service';
import { UsersService } from '../users/users.service';
import { Town } from './town.entity';
import { User } from '../users/user.entity';
import { CreateApplicationDto } from './application.dto';
import { ApplicationError } from './application-errors.enum';
import { Request, Response } from '../../common/interfaces';
import { Notification } from '../../common/enums';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    private mqttService: MqttService,
    private townsService: TownsService,
    private residentsService: ResidentsService,
    private usersService: UsersService,
  ) {}

  async getSentApplications(
    myId: number,
    req: Request,
  ): Promise<Response<Town>> {
    const applications = await this.applicationsRepository.findBy({
      userId: myId,
      resolvedAt: IsNull(),
    });
    const towns = applications.map((application) => application.townId);
    return this.townsService.getTownsByIds(towns, req);
  }

  async getReceivedApplications(
    myId: number,
    req: Request,
  ): Promise<Response<User>> {
    const applications = await this.applicationsRepository.findBy({
      town: { userId: myId },
      resolvedAt: IsNull(),
    });
    const users = applications.map((application) => application.userId);
    return this.usersService.getUsersByIds(users, req);
  }

  async createApplication(
    myId: number,
    dto: CreateApplicationDto,
  ): Promise<void> {
    await this.residentsService.throwIfResidentAlreadyExists(myId);
    const town = await this.townsService.throwIfTownNotFound(dto.townId);
    const application = await this.findApplicationByTownAndUser(town.id, myId);
    if (application) {
      throw new BadRequestException(ApplicationError.ALREADY_EXISTS);
    }
    await this.create(dto.townId, myId);
    this.mqttService.publishNotification(
      myId,
      town.userId,
      myId,
      Notification.CREATE_APPLICATION,
    );
  }

  private findApplicationByTownAndUser(
    townId: number,
    userId: number,
  ): Promise<Application | null> {
    return this.applicationsRepository.findOneBy({ townId, userId });
  }

  private async create(townId: number, userId: number): Promise<Application> {
    try {
      const application = this.applicationsRepository.create({
        townId,
        userId,
      });
      await this.applicationsRepository.save(application);
      return application;
    } catch (error) {
      throw new InternalServerErrorException(ApplicationError.CREATE_FAILED);
    }
  }
}
