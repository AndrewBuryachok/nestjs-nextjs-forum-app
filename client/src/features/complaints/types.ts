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
