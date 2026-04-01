import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { Locker } from '../../features/lockers/locker.entity';

export const LockerFactory = setSeederFactory(Locker, (faker: Faker) => {
  const locker = new Locker();
  locker.name = faker.location.city();
  locker.x = faker.number.int({ min: -1000, max: 1000 });
  locker.y = faker.number.int({ min: -1000, max: 1000 });
  return locker;
});
