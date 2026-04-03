import { BaseLocker } from '../lockers/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';
import { Status } from '@/constants/statuses';

export interface Order {
  id: number;
  locker: BaseLocker;
  customerUser: BaseUser;
  customerCard: BaseCard;
  item: Item;
  description: string;
  amount: number;
  batch: number;
  unit: Unit;
  sum: number;
  status: Status;
  createdAt: Date;
  executorUser?: BaseUser;
  executorCard?: BaseCard;
  completedAt?: Date;
}
