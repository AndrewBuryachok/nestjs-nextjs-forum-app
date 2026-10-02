import { setSeederFactory } from 'typeorm-extension';
import { Town } from '../../features/towns/town.entity';
import { World } from '../../common/enums';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '../../common/constants';

export default setSeederFactory(Town, (faker) => {
  const town = new Town();
  town.name = faker.location.city();
  town.world = faker.helpers.enumValue(World);
  town.x = faker.number.int({ min: PLACE_X_MIN, max: PLACE_X_MAX });
  town.y = faker.number.int({ min: PLACE_Y_MIN, max: PLACE_Y_MAX });
  return town;
});
