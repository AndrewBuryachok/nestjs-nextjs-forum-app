import { setSeederFactory } from 'typeorm-extension';
import { Market } from '../../features/markets/market.entity';

export default setSeederFactory(Market, (faker) => {
  const market = new Market();
  market.name = faker.location.city();
  market.x = faker.number.int({ min: -1000, max: 1000 });
  market.y = faker.number.int({ min: -1000, max: 1000 });
  return market;
});
