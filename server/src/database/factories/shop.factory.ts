import { setSeederFactory } from 'typeorm-extension';
import { Shop } from '../../features/shops/shop.entity';
import { World } from '../../common/enums';

export default setSeederFactory(Shop, (faker) => {
  const shop = new Shop();
  shop.name = faker.location.city();
  shop.world = faker.helpers.enumValue(World);
  shop.x = faker.number.int({ min: -1000, max: 1000 });
  shop.y = faker.number.int({ min: -1000, max: 1000 });
  return shop;
});
