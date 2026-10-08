import { BasePlace, Place } from '../places/types';
import { BaseUser } from '../users/types';

export interface BaseLocker extends BasePlace {}

export interface Locker extends Place {
  user: BaseUser;
  cells: number;
  orders: number;
}
