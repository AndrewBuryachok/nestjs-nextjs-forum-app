import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface Transaction {
  id: number;
  executorUser?: BaseUser;
  senderUser?: BaseUser;
  senderCard?: BaseCard;
  receiverUser?: BaseUser;
  receiverCard?: BaseCard;
  sum: number;
  description: string;
  createdAt: Date;
}
