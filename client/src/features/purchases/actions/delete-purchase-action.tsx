import { LuTrash2 } from 'react-icons/lu';
import { Purchase } from '../types';
import DeletePurchaseForm from '@/features/purchases/forms/delete-purchase-form';
import { Color } from '@/constants/colors';

export const deletePurchaseAction = (purchase: Purchase) => ({
  action: 'delete',
  dialog: 'purchase',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeletePurchaseForm purchase={purchase} />,
});
