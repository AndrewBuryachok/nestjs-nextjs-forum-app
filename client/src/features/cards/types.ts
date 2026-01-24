import { BaseUser } from '../users/types';

export interface BaseCard {
  id: number;
  name: string;
}

export interface Card extends BaseCard {
  user: BaseUser;
  balance: number;
  createdAt: Date;
}
