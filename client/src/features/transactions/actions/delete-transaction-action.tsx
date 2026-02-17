import { LuTrash2 } from 'react-icons/lu';
import { Transaction } from '../types';
import DeleteTransactionForm from '../forms/delete-transaction-form';
import { Color } from '@/constants/colors';

export const deleteTransactionAction = (transaction: Transaction) => ({
  action: 'delete',
  dialog: 'transaction',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeleteTransactionForm transaction={transaction} />,
});
