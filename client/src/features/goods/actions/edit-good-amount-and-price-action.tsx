import { LuPencil } from 'react-icons/lu';
import { Good } from '../types';
import EditGoodAmountAndPriceForm from '../forms/edit-good-amount-and-price-form';
import { Color } from '@/constants/colors';

export const editGoodAmountAndPriceFactory = (good: Good, isAll: boolean) => ({
  action: 'edit',
  dialog: 'good',
  color: Color.YELLOW,
  icon: <LuPencil />,
  body: <EditGoodAmountAndPriceForm good={good} isAll={isAll} />,
});

export const editMyGoodAmountAndPriceAction = (good: Good) =>
  editGoodAmountAndPriceFactory(good, false);

export const editUserGoodAmountAndPriceAction = (good: Good) =>
  editGoodAmountAndPriceFactory(good, true);
