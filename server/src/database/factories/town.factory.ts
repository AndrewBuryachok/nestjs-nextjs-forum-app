import { setSeederFactory } from 'typeorm-extension';
import { Town } from '../../features/towns/town.entity';

export default setSeederFactory(Town, (faker) => {
  const town = new Town();
  town.name = faker.location.city();
  town.x = faker.number.int({ min: -1000, max: 1000 });
  town.y = faker.number.int({ min: -1000, max: 1000 });
  return town;
});
