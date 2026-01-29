import { BaseUser } from '../users/types';

export interface BaseAccount {
  id: number;
  name: string;
}

export interface BaseAccountWithUser extends BaseAccount {
  user: BaseUser;
}

export interface BaseAccountWithUserAndBalance extends BaseAccountWithUser {
  balance: number;
}

export interface Account extends BaseAccountWithUserAndBalance {
  createdAt: Date;
}
