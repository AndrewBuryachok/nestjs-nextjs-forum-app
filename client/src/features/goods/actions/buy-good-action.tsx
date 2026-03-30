import { LuPlus } from 'react-icons/lu';
import { Good } from '../types';
import BuyGoodForm from '../forms/buy-good-form';
import { Color } from '@/constants/colors';

export const buyGoodFactory = (good: Good, isAll: boolean) => ({
  action: 'buy',
  dialog: 'good',
  color: Color.GREEN,
  icon: <LuPlus />,
  body: <BuyGoodForm good={good} isAll={isAll} />,
});

export const buyMyGoodAction = (good: Good) => buyGoodFactory(good, false);

export const buyUserGoodAction = (good: Good) => buyGoodFactory(good, true);
