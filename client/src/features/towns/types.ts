import { BasePlace, Place } from '../places/types';
import { BaseUser } from '../users/types';

export interface BaseTownWithUser extends BasePlace {
  user: BaseUser;
}

export interface Town extends Place {
  user: BaseUser;
  users: number;
}
