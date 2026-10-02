import { setSeederFactory } from 'typeorm-extension';
import { Locker } from '../../features/lockers/locker.entity';
import { World } from '../../common/enums';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '../../common/constants';

export default setSeederFactory(Locker, (faker) => {
  const locker = new Locker();
  locker.name = faker.location.city();
  locker.world = faker.helpers.enumValue(World);
  locker.x = faker.number.int({ min: PLACE_X_MIN, max: PLACE_X_MAX });
  locker.y = faker.number.int({ min: PLACE_Y_MIN, max: PLACE_Y_MAX });
  return locker;
});
