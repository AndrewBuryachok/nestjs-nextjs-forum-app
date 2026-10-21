import { LuSquareMinus } from 'react-icons/lu';
import { Town } from '../types';
import RemoveTownChunkForm from '../forms/remove-town-chunk-form';
import { Color } from '@/constants/colors';

export const removeTownChunkFactory = (town: Town, isAll: boolean) => ({
  action: 'remove',
  dialog: 'chunk',
  color: Color.RED,
  disabled: !town.chunks,
  userId: isAll ? 0 : town.user.id,
  icon: <LuSquareMinus />,
  body: <RemoveTownChunkForm town={town} isAll={isAll} />,
});

export const removeMyTownChunkAction = (town: Town) =>
  removeTownChunkFactory(town, false);

export const removeUserTownChunkAction = (town: Town) =>
  removeTownChunkFactory(town, true);
