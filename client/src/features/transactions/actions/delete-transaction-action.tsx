import { LuTrash2 } from 'react-icons/lu';
import { Transaction } from '../types';
import DeleteTransactionForm from '../forms/delete-transaction-form';
import { Role } from '@/constants/roles';

export const deleteTransactionAction = (transaction: Transaction) => ({
  danger: true,
  action: 'delete',
  dialog: 'transaction',
  role: Role.ADMIN,
  icon: <LuTrash2 />,
  body: <DeleteTransactionForm transaction={transaction} />,
});
