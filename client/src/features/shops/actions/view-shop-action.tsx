import { LuEye } from 'react-icons/lu';
import { Shop } from '../types';
import ViewShopForm from '../forms/view-shop-form';

export const viewShopAction = (shop: Shop) => ({
  action: 'view',
  dialog: 'shop',
  icon: <LuEye />,
  body: <ViewShopForm shop={shop} />,
});
