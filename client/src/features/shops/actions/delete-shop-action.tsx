import { LuTrash2 } from 'react-icons/lu';
import { Shop } from '../types';
import DeleteShopForm from '../forms/delete-shop-form';
import { Color } from '@/constants/colors';

export const deleteShopFactory = (shop: Shop, isAll: boolean) => ({
  action: 'delete',
  dialog: 'shop',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeleteShopForm shop={shop} isAll={isAll} />,
});

export const deleteMyShopAction = (shop: Shop) =>
  deleteShopFactory(shop, false);

export const deleteUserShopAction = (shop: Shop) =>
  deleteShopFactory(shop, true);
