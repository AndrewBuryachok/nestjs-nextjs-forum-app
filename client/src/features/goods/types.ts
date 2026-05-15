import { BaseShopWithCard } from '../shops/types';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export interface BaseGood {
  id: number;
  shop: BaseShopWithCard;
  item: Item;
  description: string;
  batch: number;
  unit: Unit;
}

export interface Good extends BaseGood {
  amount: number;
  price: number;
  createdAt: Date;
  purchases: number;
}
