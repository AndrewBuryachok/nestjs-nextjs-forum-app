import { Account, BaseAccount } from '../accounts/types';
import { BaseUser } from '../users/types';

export interface CardId {
  id: number;
}

export interface BaseCard extends CardId {
  account: BaseAccount;
  user: BaseUser;
}

export interface Card extends CardId {
  account: Account;
}
