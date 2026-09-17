import { setSeederFactory } from 'typeorm-extension';
import { Landmark } from '../../features/landmarks/landmark.entity';
import { World } from '../../common/enums';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '../../common/constants';

export default setSeederFactory(Landmark, (faker) => {
  const landmark = new Landmark();
  landmark.name = faker.location.city();
  landmark.world = faker.helpers.enumValue(World);
  landmark.x = faker.number.int({ min: PLACE_X_MIN, max: PLACE_X_MAX });
  landmark.y = faker.number.int({ min: PLACE_Y_MIN, max: PLACE_Y_MAX });
  return landmark;
});
