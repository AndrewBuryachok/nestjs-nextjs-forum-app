import { setSeederFactory } from 'typeorm-extension';
import { Shop } from '../../features/shops/shop.entity';

export default setSeederFactory(Shop, (faker) => {
  const shop = new Shop();
  shop.name = faker.location.city();
  shop.x = faker.number.int({ min: -1000, max: 1000 });
  shop.y = faker.number.int({ min: -1000, max: 1000 });
  return shop;
});
