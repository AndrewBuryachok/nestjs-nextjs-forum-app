import { BaseShop } from '../shops/types';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export interface Good {
  id: number;
  shop: BaseShop;
  item: Item;
  description: string;
  amount: number;
  batch: number;
  unit: Unit;
  price: number;
  createdAt: Date;
}
