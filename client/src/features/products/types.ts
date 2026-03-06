import { BaseShopWithCard } from '../shops/types';
import { BaseUser } from '../users/types';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export interface Product {
  id: number;
  shop: BaseShopWithCard;
  user: BaseUser;
  item: Item;
  description: string;
  amount: number;
  batch: number;
  unit: Unit;
  price: number;
  createdAt: Date;
}
