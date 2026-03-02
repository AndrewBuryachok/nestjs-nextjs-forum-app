import { BaseCard } from '../cards/types';

export interface Shop {
  id: number;
  card: BaseCard;
  name: string;
  x: number;
  y: number;
  createdAt: Date;
}
