import { BasePlace, Place } from '../places/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface BaseShop extends BasePlace {}

export interface BaseShopWithCard extends BaseShop {
  card: BaseCard;
}

export interface Shop extends Place {
  user: BaseUser;
  card: BaseCard;
}
