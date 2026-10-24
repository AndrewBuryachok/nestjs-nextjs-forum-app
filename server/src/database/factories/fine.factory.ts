import { setSeederFactory } from 'typeorm-extension';
import { Fine } from '../../features/fines/fine.entity';

export default setSeederFactory(Fine, (faker) => {
  const fine = new Fine();
  fine.description = faker.lorem.words(2);
  fine.completedAt = new Date();
  fine.completedAt.setDate(fine.completedAt.getDate() + 7);
  return fine;
});
