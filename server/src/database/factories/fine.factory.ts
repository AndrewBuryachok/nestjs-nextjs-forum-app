import { setSeederFactory } from 'typeorm-extension';
import { Fine } from '../../features/fines/fine.entity';

export default setSeederFactory(Fine, (faker) => {
  const fine = new Fine();
  fine.description = 'тестовое описание';
  fine.completedAt = new Date();
  fine.completedAt.setDate(fine.completedAt.getDate() + 7);
  return fine;
});
