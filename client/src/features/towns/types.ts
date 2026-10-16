import { BasePlace, Place } from '../places/types';
import { BaseUser } from '../users/types';

export interface BaseTown extends BasePlace {}

export interface BaseTownWithUser extends BasePlace {
  user: BaseUser;
}

export interface Town extends Place {
  user: BaseUser;
  level: number;
  users: number;
}
