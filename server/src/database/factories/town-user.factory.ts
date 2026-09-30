import { setSeederFactory } from 'typeorm-extension';
import { TownUser } from '../../features/towns/town-user.entity';

export default setSeederFactory(TownUser, (faker) => {
  const townUser = new TownUser();
  return townUser;
});
