import { setSeederFactory } from 'typeorm-extension';
import { Rent } from '../../features/rents/rent.entity';

export default setSeederFactory(Rent, (faker) => {
  const rent = new Rent();
  rent.completedAt = new Date();
  rent.completedAt.setDate(rent.completedAt.getDate() + 7);
  return rent;
});
