import { Place } from '../places/types';
import { BaseMarketWithUserAndCard } from '../markets/types';

export interface Plot extends Place {
  market: BaseMarketWithUserAndCard;
  price: number;
  reservedUntil?: Date;
}
