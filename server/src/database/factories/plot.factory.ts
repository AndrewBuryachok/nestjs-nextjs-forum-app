import { setSeederFactory } from 'typeorm-extension';
import { Plot } from '../../features/plots/plot.entity';

export default setSeederFactory(Plot, (faker) => {
  const plot = new Plot();
  plot.name = faker.location.city();
  plot.x = faker.number.int({ min: -1000, max: 1000 });
  plot.y = faker.number.int({ min: -1000, max: 1000 });
  plot.price = faker.number.int({ min: 1, max: 100 });
  return plot;
});
