import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface Shop {
  id: number;
  user: BaseUser;
  card: BaseCard;
  name: string;
  x: number;
  y: number;
  createdAt: Date;
}
