import {
  Account,
  BaseAccount,
  BaseAccountWithUser,
  BaseAccountWithUserAndBalance,
} from '../accounts/types';
import { BaseUser } from '../users/types';

export interface CardId {
  id: number;
}

export interface BaseCard extends CardId {
  account: BaseAccount;
  user: BaseUser;
}

export interface SelectCard extends CardId {
  account: BaseAccountWithUser;
}

export interface SelectCardWithBalance extends CardId {
  account: BaseAccountWithUserAndBalance;
}

export interface Card extends CardId {
  account: Account;
}
