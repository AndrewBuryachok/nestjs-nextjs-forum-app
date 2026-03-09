import { BaseProduct } from '../products/types';
import { BaseUser } from '../users/types';
import { BaseCard } from '../cards/types';

export interface Purchase {
  id: number;
  product: BaseProduct;
  user: BaseUser;
  card: BaseCard;
  amount: number;
  price: number;
  createdAt: Date;
}
