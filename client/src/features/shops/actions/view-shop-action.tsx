import { LuEye } from 'react-icons/lu';
import { Shop } from '../types';
import ViewShopForm from '../forms/view-shop-form';
import { Color } from '@/constants/colors';

export const viewShopAction = (shop: Shop) => ({
  action: 'view',
  dialog: 'shop',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewShopForm shop={shop} />,
});
