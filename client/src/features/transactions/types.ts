import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';
import { TransactionType } from '@/constants/transaction-types';

export interface Transaction {
  id: number;
  executorUser?: BaseUser;
  senderUser?: BaseUser;
  senderCard?: BaseCard;
  receiverUser?: BaseUser;
  receiverCard?: BaseCard;
  type: TransactionType;
  sum: number;
  description: string;
  createdAt: Date;
}
