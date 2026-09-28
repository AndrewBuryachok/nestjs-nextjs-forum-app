import { Place } from '../places/types';
import { BaseUser } from '../users/types';

export interface Town extends Place {
  user: BaseUser;
}
