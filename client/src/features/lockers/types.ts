import { Place } from '../places/types';
import { User } from '../users/types';

export interface Locker extends Place {
  user: User;
}
