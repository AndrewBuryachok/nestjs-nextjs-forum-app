import { setSeederFactory } from 'typeorm-extension';
import { Card } from '../../features/cards/card.entity';

export default setSeederFactory(Card, (faker) => {
  const card = new Card();
  const name = faker.finance.accountName();
  card.name = name.slice(0, name.lastIndexOf(' '));
  card.balance = 0;
  return card;
});
