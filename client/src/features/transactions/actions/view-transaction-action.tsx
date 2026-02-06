import { LuEye } from 'react-icons/lu';
import { Transaction } from '../types';
import ViewTransactionForm from '../forms/view-transaction-form';
import { Color } from '@/constants/colors';

export const viewTransactionAction = (transaction: Transaction) => ({
  action: 'view',
  dialog: 'transaction',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewTransactionForm transaction={transaction} />,
});
