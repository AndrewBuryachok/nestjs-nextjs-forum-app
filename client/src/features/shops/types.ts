import { BasePlace, Place } from '../places/types';
import { BaseCard } from '../cards/types';

export interface BaseShop extends BasePlace {
  card: BaseCard;
}

export interface Shop extends Place {
  card: BaseCard;
}
