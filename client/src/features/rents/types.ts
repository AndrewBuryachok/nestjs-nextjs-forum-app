import { BasePlot } from '../plots/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface BaseRent {
  id: number;
  user: BaseUser;
  card: BaseCard;
  createdAt: Date;
  completedAt: Date;
}

export interface Rent extends BaseRent {
  plot: BasePlot;
}
