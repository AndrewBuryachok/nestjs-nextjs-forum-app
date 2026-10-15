import { Entity } from 'typeorm';
import { InvitationOrApplication } from './invitation-or-application.entity';

@Entity('invitations')
export class Invitation extends InvitationOrApplication {}
