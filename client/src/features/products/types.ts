import { BaseShop } from '../shops/types';
import { BaseRent } from '../rents/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';
import { Item } from '@/constants/items';
import { Unit } from '@/constants/units';

export interface Product {
  id: number;
  shop?: BaseShop;
  rent?: BaseRent;
  user: BaseUser;
  card: BaseCard;
  item: Item;
  description: string;
  amount: number;
  batch: number;
  unit: Unit;
  price: number;
  createdAt: Date;
}
