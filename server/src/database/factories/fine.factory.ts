import { setSeederFactory } from 'typeorm-extension';
import { Fine } from '../../features/fines/fine.entity';

export default setSeederFactory(Fine, (faker) => {
  const fine = new Fine();
  fine.description = faker.lorem.words(2);
  return fine;
});
