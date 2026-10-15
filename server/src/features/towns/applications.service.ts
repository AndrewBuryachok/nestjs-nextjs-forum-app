import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Application } from './application.entity';
import { TownsService } from './towns.service';
import { UsersService } from '../users/users.service';
import { Town } from './town.entity';
import { User } from '../users/user.entity';
import { Request, Response } from '../../common/interfaces';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
    private townsService: TownsService,
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
}
