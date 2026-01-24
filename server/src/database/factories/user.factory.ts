import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { User } from '../../features/users/user.entity';

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.nick = faker.person.firstName();
  return user;
});
