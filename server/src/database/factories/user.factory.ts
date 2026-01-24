import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../features/users/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.nick = faker.person.firstName();
  return user;
});
