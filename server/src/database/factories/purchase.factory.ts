import { setSeederFactory } from 'typeorm-extension';
import { Purchase } from '../../features/purchases/purchase.entity';

export const PurchaseFactory = setSeederFactory(Purchase, () => {
  const purchase = new Purchase();
  return purchase;
});
