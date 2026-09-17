import { Place } from '../places/types';
import { User } from '../users/types';

export interface Landmark extends Place {
  user: User;
}
