import { LuPencil } from 'react-icons/lu';
import { Market } from '../types';
import EditMarketForm from '../forms/edit-market-form';
import { Color } from '@/constants/colors';

export const editMarketFactory = (market: Market, isAll: boolean) => ({
  action: 'edit',
  dialog: 'market',
  color: Color.YELLOW,
  icon: <LuPencil />,
  body: <EditMarketForm market={market} isAll={isAll} />,
});

export const editMyMarketAction = (market: Market) =>
  editMarketFactory(market, false);

export const editUserMarketAction = (market: Market) =>
  editMarketFactory(market, true);
