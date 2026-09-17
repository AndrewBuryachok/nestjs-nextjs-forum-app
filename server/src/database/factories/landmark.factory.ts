import { setSeederFactory } from 'typeorm-extension';
import { Landmark } from '../../features/landmarks/landmark.entity';

export default setSeederFactory(Landmark, (faker) => {
  const landmark = new Landmark();
  landmark.name = faker.location.city();
  landmark.x = faker.number.int({ min: -1000, max: 1000 });
  landmark.y = faker.number.int({ min: -1000, max: 1000 });
  return landmark;
});
