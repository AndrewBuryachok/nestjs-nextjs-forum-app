import { LuTrash2 } from 'react-icons/lu';
import { Product } from '../types';
import DeleteProductForm from '../forms/delete-product-form';
import { Color } from '@/constants/colors';

export const deleteProductFactory = (product: Product, isAll: boolean) => ({
  action: 'delete',
  dialog: 'product',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeleteProductForm product={product} isAll={isAll} />,
});

export const deleteMyProductAction = (product: Product) =>
  deleteProductFactory(product, false);

export const deleteUserProductAction = (product: Product) =>
  deleteProductFactory(product, true);
