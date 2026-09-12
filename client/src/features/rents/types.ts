import { BasePlot } from '../plots/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface Rent {
  id: number;
  plot: BasePlot;
  user: BaseUser;
  card: BaseCard;
  createdAt: Date;
  completedAt: Date;
}
