import { LuEye } from 'react-icons/lu';
import { Market } from '../types';
import ViewMarketForm from '../forms/view-market-form';
import { Color } from '@/constants/colors';

export const viewMarketAction = (market: Market) => ({
  action: 'view',
  dialog: 'market',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewMarketForm market={market} />,
});
