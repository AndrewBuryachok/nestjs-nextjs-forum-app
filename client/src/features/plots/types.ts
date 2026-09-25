import { BasePlace, Place } from '../places/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';
import { BaseRentWithUserAndCard } from '../rents/types';

export interface BasePlot extends BasePlace {}

export interface BasePlotWithUserAndCardAndPrice extends BasePlace {
  user: BaseUser;
  card: BaseCard;
  price: number;
}

export interface Plot extends Place {
  user: BaseUser;
  card: BaseCard;
  price: number;
  rent?: BaseRentWithUserAndCard;
}
