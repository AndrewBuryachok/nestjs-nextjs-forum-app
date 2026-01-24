import { setSeederFactory } from 'typeorm-extension';
import { Transaction } from '../../features/transactions/transaction.entity';

export default setSeederFactory(Transaction, (faker) => {
  const transaction = new Transaction();
  return transaction;
});
