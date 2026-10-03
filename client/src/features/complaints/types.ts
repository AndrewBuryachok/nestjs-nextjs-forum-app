import { BaseUser } from '../users/types';

export interface Complaint {
  id: number;
  title: string;
  senderUser: BaseUser;
  receiverUser: BaseUser;
  createdAt: Date;
  judgeUser?: BaseUser;
  closedAt?: Date;
}

export interface ComplaintMessage {
  id: number;
  user: BaseUser;
  text: string;
  createdAt: Date;
}

export interface ComplaintWithMessages extends Complaint {
  messages: ComplaintMessage[];
}
