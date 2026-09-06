import { setSeederFactory } from 'typeorm-extension';
import { Fine } from '../../features/fines/fine.entity';

export default setSeederFactory(Fine, (faker) => {
  const fine = new Fine();
  fine.description = 'тестовое описание';
  return fine;
});
