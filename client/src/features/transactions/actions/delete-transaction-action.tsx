import { LuTrash2 } from 'react-icons/lu';
import { Transaction } from '../types';
import DeleteTransactionForm from '../forms/delete-transaction-form';

export const deleteTransactionAction = (transaction: Transaction) => ({
  danger: true,
  action: 'delete',
  dialog: 'transaction',
  icon: <LuTrash2 />,
  body: <DeleteTransactionForm transaction={transaction} />,
});
