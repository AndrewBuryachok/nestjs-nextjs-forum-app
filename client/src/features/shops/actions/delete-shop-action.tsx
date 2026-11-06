import { LuTrash2 } from 'react-icons/lu';
import { Shop } from '../types';
import DeleteShopForm from '../forms/delete-shop-form';

export const deleteShopFactory = (shop: Shop, isAll: boolean) => ({
  danger: true,
  action: 'delete',
  dialog: 'shop',
  icon: <LuTrash2 />,
  body: <DeleteShopForm shop={shop} isAll={isAll} />,
});

export const deleteMyShopAction = (shop: Shop) =>
  deleteShopFactory(shop, false);

export const deleteUserShopAction = (shop: Shop) =>
  deleteShopFactory(shop, true);
