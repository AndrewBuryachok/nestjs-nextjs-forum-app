import { BaseShop } from '../shops/types';
import { BaseRent } from '../rents/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export interface BaseProduct {
  id: number;
  shop?: BaseShop;
  rent?: BaseRent;
  user: BaseUser;
  card: BaseCard;
  item: Item;
  description: string;
  batch: number;
  unit: Unit;
}

export interface Product extends BaseProduct {
  amount: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  purchases: number;
}
