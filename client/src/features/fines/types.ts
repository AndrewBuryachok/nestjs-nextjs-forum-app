import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface Fine {
  id: number;
  senderUser: BaseUser;
  senderCard: BaseCard;
  receiverUser: BaseUser;
  receiverCard?: BaseCard;
  sum: number;
  description: string;
  createdAt: Date;
  paidAt?: Date;
}
