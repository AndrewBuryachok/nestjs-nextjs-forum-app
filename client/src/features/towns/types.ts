import { BasePlace, Place } from '../places/types';
import { BaseUser } from '../users/types';

export interface BaseTown extends BasePlace {}

export interface BaseTownWithUser extends BasePlace {
  user: BaseUser;
}

export interface Town extends Place {
  user: BaseUser;
  users: number;
  chunks: number;
}

export interface TownChunk {
  id: number;
  x: number;
  y: number;
}
