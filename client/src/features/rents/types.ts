import { BasePlot, BasePlotWithUserAndCardAndPrice } from '../plots/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface BaseRent {
  id: number;
  plot: BasePlot;
}

export interface BaseRentWithUserAndCard {
  id: number;
  user: BaseUser;
  card: BaseCard;
  createdAt: Date;
  completedAt: Date;
}

export interface Rent extends BaseRentWithUserAndCard {
  plot: BasePlotWithUserAndCardAndPrice;
}
