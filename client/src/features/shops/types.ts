import { BasePlace, Place } from '../places/types';
import { BaseCard } from '../cards/types';

export interface BaseShop extends BasePlace {}

export interface BaseShopWithCard extends BaseShop {
  card: BaseCard;
}

export interface Shop extends Place {
  card: BaseCard;
}
