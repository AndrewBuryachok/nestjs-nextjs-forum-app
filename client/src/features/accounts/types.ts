import { BaseUser } from '../users/types';

export interface BaseAccount {
  id: number;
  name: string;
}

export interface Account extends BaseAccount {
  user: BaseUser;
  balance: number;
  createdAt: Date;
}
