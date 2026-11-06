import { LuEye } from 'react-icons/lu';
import { Product } from '../types';
import ViewProductForm from '../forms/view-product-form';

export const viewProductAction = (product: Product) => ({
  action: 'view',
  dialog: 'product',
  icon: <LuEye />,
  body: <ViewProductForm product={product} />,
});
