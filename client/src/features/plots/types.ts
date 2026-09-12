import { BasePlace, Place } from '../places/types';
import { BaseMarketWithUserAndCard } from '../markets/types';

export interface BasePlot extends BasePlace {
  market: BaseMarketWithUserAndCard;
  price: number;
}

export interface Plot extends Place {
  market: BaseMarketWithUserAndCard;
  price: number;
  reservedUntil?: Date;
}
