import { BaseLocker } from '../lockers/types';
import { BaseCard } from '../cards/types';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';
import { Status } from '@/constants/statuses';

export interface Order {
  id: number;
  locker: BaseLocker;
  customerCard: BaseCard;
  executorCard?: BaseCard;
  item: Item;
  description: string;
  amount: number;
  batch: number;
  unit: Unit;
  sum: number;
  status: Status;
  createdAt: Date;
  completedAt?: Date;
}
