import { LuPencil } from 'react-icons/lu';
import { Product } from '../types';
import EditProductForm from '../forms/edit-product-form';
import { Color } from '@/constants/colors';

export const editProductFactory = (product: Product, isAll: boolean) => ({
  action: 'edit',
  dialog: 'product',
  color: Color.YELLOW,
  icon: <LuPencil />,
  body: <EditProductForm product={product} isAll={isAll} />,
});

export const editMyProductAction = (product: Product) =>
  editProductFactory(product, false);

export const editUserProductAction = (product: Product) =>
  editProductFactory(product, true);
