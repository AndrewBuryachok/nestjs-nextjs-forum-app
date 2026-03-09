import { BaseShopWithCard } from '../shops/types';
import { BaseUser } from '../users/types';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export interface BaseProduct {
  id: number;
  shop: BaseShopWithCard;
  user: BaseUser;
  item: Item;
  description: string;
  batch: number;
  unit: Unit;
}

export interface Product extends BaseProduct {
  amount: number;
  price: number;
  createdAt: Date;
}
