import { BasePlace, Place } from '../places/types';
import { User } from '../users/types';

export interface BaseLocker extends BasePlace {}

export interface Locker extends Place {
  user: User;
}
