import { LuPencil } from 'react-icons/lu';
import { Product } from '../types';
import EditProductAmountAndPriceForm from '../forms/edit-product-amount-and-price-form';
import { Color } from '@/constants/colors';

export const editProductAmountAndPriceFactory = (
  product: Product,
  isAll: boolean,
) => ({
  action: 'edit',
  dialog: 'product',
  color: Color.YELLOW,
  userId: isAll ? 0 : product.user.id,
  icon: <LuPencil />,
  body: <EditProductAmountAndPriceForm product={product} isAll={isAll} />,
});

export const editMyProductAmountAndPriceAction = (product: Product) =>
  editProductAmountAndPriceFactory(product, false);

export const editUserProductAmountAndPriceAction = (product: Product) =>
  editProductAmountAndPriceFactory(product, true);
