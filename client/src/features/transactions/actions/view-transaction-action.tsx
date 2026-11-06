import { LuEye } from 'react-icons/lu';
import { Transaction } from '../types';
import ViewTransactionForm from '../forms/view-transaction-form';

export const viewTransactionAction = (transaction: Transaction) => ({
  action: 'view',
  dialog: 'transaction',
  icon: <LuEye />,
  body: <ViewTransactionForm transaction={transaction} />,
});
