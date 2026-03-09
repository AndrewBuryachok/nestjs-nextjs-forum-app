import { LuEye } from 'react-icons/lu';
import { Purchase } from '../types';
import ViewPurchaseForm from '../forms/view-purchase-form';
import { Color } from '@/constants/colors';

export const viewPurchaseAction = (purchase: Purchase) => ({
  action: 'view',
  dialog: 'purchase',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewPurchaseForm purchase={purchase} />,
});
