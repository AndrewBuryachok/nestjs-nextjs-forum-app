import { LuPencil } from 'react-icons/lu';
import { Shop } from '../types';
import EditShopForm from '../forms/edit-shop-form';
import { Color } from '@/constants/colors';

export const editShopFactory = (shop: Shop, isAll: boolean) => ({
  action: 'edit',
  dialog: 'shop',
  color: Color.YELLOW,
  icon: <LuPencil />,
  body: <EditShopForm shop={shop} isAll={isAll} />,
});

export const editMyShopAction = (shop: Shop) => editShopFactory(shop, false);

export const editUserShopAction = (shop: Shop) => editShopFactory(shop, true);
