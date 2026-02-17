import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
import { User } from '../../features/users/user.entity';
import { hashData } from '../../common/utils';

export const UserFactory = setSeederFactory(User, async (faker: Faker) => {
  const user = new User();
  user.nick = faker.person.firstName();
  user.password = await hashData(user.nick + user.nick);
  return user;
});
