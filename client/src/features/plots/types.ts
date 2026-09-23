import { Place } from '../places/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface Plot extends Place {
  user: BaseUser;
  card: BaseCard;
  price: number;
}
