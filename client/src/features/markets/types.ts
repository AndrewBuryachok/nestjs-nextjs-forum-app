import { Place } from '../places/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface Market extends Place {
  user: BaseUser;
  card: BaseCard;
}
