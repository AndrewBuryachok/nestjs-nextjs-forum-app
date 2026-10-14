import { setSeederFactory } from 'typeorm-extension';
import { Town } from '../../features/towns/town.entity';

export default setSeederFactory(Town, (faker) => {
  const town = new Town();
  town.name = faker.location.city();
  town.x = faker.number.int({ min: -1000, max: 1000 });
  town.y = faker.number.int({ min: -1000, max: 1000 });
  const maxLevel = Number(process.env.MAX_TOWN_LEVEL);
  town.level = faker.number.int({ min: 1, max: maxLevel });
  return town;
});
