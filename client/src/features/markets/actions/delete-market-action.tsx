import { LuTrash2 } from 'react-icons/lu';
import { Market } from '../types';
import DeleteMarketForm from '../forms/delete-market-form';
import { Color } from '@/constants/colors';

export const deleteMarketFactory = (market: Market, isAll: boolean) => ({
  action: 'delete',
  dialog: 'market',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeleteMarketForm market={market} isAll={isAll} />,
});

export const deleteMyMarketAction = (market: Market) =>
  deleteMarketFactory(market, false);

export const deleteUserMarketAction = (market: Market) =>
  deleteMarketFactory(market, true);
