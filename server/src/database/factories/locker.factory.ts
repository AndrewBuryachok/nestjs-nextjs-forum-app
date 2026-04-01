import { setSeederFactory } from 'typeorm-extension';
import { Locker } from '../../features/lockers/locker.entity';

export default setSeederFactory(Locker, (faker) => {
  const locker = new Locker();
  locker.name = faker.location.city();
  locker.x = faker.number.int({ min: -1000, max: 1000 });
  locker.y = faker.number.int({ min: -1000, max: 1000 });
  return locker;
});
