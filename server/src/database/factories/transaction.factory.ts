import { setSeederFactory } from 'typeorm-extension';
import { Transaction } from '../../features/transactions/transaction.entity';

export const TransactionFactory = setSeederFactory(Transaction, () => {
  const transaction = new Transaction();
  return transaction;
});
