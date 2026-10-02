import { setSeederFactory } from 'typeorm-extension';
import { Plot } from '../../features/plots/plot.entity';
import { World } from '../../common/enums';
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '../../common/constants';

export default setSeederFactory(Plot, (faker) => {
  const plot = new Plot();
  plot.name = faker.location.city();
  plot.world = faker.helpers.enumValue(World);
  plot.x = faker.number.int({ min: PLACE_X_MIN, max: PLACE_X_MAX });
  plot.y = faker.number.int({ min: PLACE_Y_MIN, max: PLACE_Y_MAX });
  plot.price = faker.number.int({ min: 1, max: 100 });
  return plot;
});
