import { setSeederFactory } from 'typeorm-extension';
import { CardUser } from '../../features/cards/card-user.entity';

export default setSeederFactory(CardUser, (faker) => {
  const cardUser = new CardUser();
  return cardUser;
});
