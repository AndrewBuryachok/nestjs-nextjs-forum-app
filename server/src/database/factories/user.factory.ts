import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../features/users/user.entity';
import { hashData } from '../../common/utils';
import { Role } from '../../common/enums';

export default setSeederFactory(User, async (faker) => {
  const user = new User();
  user.nick = faker.person.firstName();
  user.password = await hashData(user.nick + user.nick);
  user.roles = faker.datatype.boolean() ? [Role.ADMIN] : [];
  return user;
});
