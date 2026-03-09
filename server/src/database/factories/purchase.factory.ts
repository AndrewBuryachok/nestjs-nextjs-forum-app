import { setSeederFactory } from 'typeorm-extension';
import { Purchase } from '../../features/purchases/purchase.entity';

export default setSeederFactory(Purchase, (faker) => {
  const purchase = new Purchase();
  return purchase;
});
