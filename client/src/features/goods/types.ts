import { BaseShopWithCard } from '../shops/types';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export interface Good {
  id: number;
  shop: BaseShopWithCard;
  item: Item;
  description: string;
  amount: number;
  batch: number;
  unit: Unit;
  price: number;
  createdAt: Date;
}
