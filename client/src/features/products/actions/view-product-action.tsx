import { LuEye } from 'react-icons/lu';
import { Product } from '../types';
import ViewProductForm from '../forms/view-product-form';
import { Color } from '@/constants/colors';

export const viewProductAction = (product: Product) => ({
  action: 'view',
  dialog: 'product',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewProductForm product={product} />,
});
