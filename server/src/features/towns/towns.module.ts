import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Town } from './town.entity';
import { TownUser } from './town-user.entity';
import { Invitation } from './invitation.entity';
import { Application } from './application.entity';
import { UsersModule } from '../users/users.module';
import { TownsController } from './towns.controller';
import { ResidentsController } from './residents.controller';
import { InvitationsController } from './invitations.controller';
import { ApplicationsController } from './applications.controller';
import { TownsService } from './towns.service';
import { ResidentsService } from './residents.service';
import { InvitationsService } from './invitations.service';
import { ApplicationsService } from './applications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Town, TownUser, Invitation, Application]),
    UsersModule,
  ],
  controllers: [
    TownsController,
    ResidentsController,
    InvitationsController,
    ApplicationsController,
  ],
  providers: [
    TownsService,
    ResidentsService,
    InvitationsService,
    ApplicationsService,
  ],
})
export class TownsModule {}
