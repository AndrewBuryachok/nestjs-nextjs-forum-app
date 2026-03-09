import { BaseGood } from '../goods/types';
import { BaseCard } from '../cards/types';

export interface Purchase {
  id: number;
  good: BaseGood;
  card: BaseCard;
  amount: number;
  price: number;
  createdAt: Date;
}
