import { LuPlus } from 'react-icons/lu';
import { Product } from '../types';
import BuyProductForm from '../forms/buy-product-form';
import { Color } from '@/constants/colors';

export const buyProductFactory = (product: Product, isAll: boolean) => ({
  action: 'buy',
  dialog: 'product',
  color: Color.GREEN,
  icon: <LuPlus />,
  body: <BuyProductForm product={product} isAll={isAll} />,
});

export const buyMyProductAction = (product: Product) =>
  buyProductFactory(product, false);

export const buyUserProductAction = (product: Product) =>
  buyProductFactory(product, true);
