import { BaseUser } from '../users/types';

export interface BaseCard {
  id: number;
  name: string;
}

export interface SelectCard extends BaseCard {
  user: BaseUser;
}

export interface SelectCardWithBalance extends SelectCard {
  balance: number;
}

export interface Card extends SelectCardWithBalance {
  createdAt: Date;
}
