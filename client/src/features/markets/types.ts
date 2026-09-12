import { BasePlace, Place } from '../places/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface BaseMarket extends BasePlace {}

export interface BaseMarketWithUserAndCard extends BaseMarket {
  user: BaseUser;
  card: BaseCard;
}

export interface Market extends Place {
  user: BaseUser;
  card: BaseCard;
}
