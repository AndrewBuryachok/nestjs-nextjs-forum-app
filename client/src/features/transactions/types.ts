import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface Transaction {
  id: number;
  executorUser?: BaseUser;
  senderCard?: BaseCard;
  receiverCard?: BaseCard;
  sum: number;
  description: string;
  createdAt: Date;
}
