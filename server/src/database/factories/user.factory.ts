import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../features/users/user.entity';
import { hashData } from '../../common/utils';

export default setSeederFactory(User, async (faker) => {
  const user = new User();
  user.nick = faker.person.firstName();
  user.password = await hashData(user.nick + user.nick);
  return user;
});
