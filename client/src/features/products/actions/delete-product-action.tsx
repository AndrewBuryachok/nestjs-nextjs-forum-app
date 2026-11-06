import { LuTrash2 } from 'react-icons/lu';
import { Product } from '../types';
import DeleteProductForm from '../forms/delete-product-form';

export const deleteProductFactory = (product: Product, isAll: boolean) => ({
  danger: true,
  action: 'delete',
  dialog: 'product',
  icon: <LuTrash2 />,
  body: <DeleteProductForm product={product} isAll={isAll} />,
});

export const deleteMyProductAction = (product: Product) =>
  deleteProductFactory(product, false);

export const deleteUserProductAction = (product: Product) =>
  deleteProductFactory(product, true);
