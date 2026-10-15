import { Entity } from 'typeorm';
import { InvitationOrApplication } from './invitation-or-application.entity';

@Entity('applications')
export class Application extends InvitationOrApplication {}
