import { setSeederFactory } from 'typeorm-extension';
import { Shop } from '../../features/shops/shop.entity';
import { World } from '../../common/enums';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '../../common/constants';

export default setSeederFactory(Shop, (faker) => {
  const shop = new Shop();
  shop.name = faker.location.city();
  shop.world = faker.helpers.enumValue(World);
  shop.x = faker.number.int({ min: PLACE_X_MIN, max: PLACE_X_MAX });
  shop.y = faker.number.int({ min: PLACE_Y_MIN, max: PLACE_Y_MAX });
  return shop;
});
