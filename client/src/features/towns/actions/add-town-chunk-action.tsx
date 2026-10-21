import { LuSquarePlus } from 'react-icons/lu';
import { Town } from '../types';
import AddTownChunkForm from '../forms/add-town-chunk-form';
import { Color } from '@/constants/colors';

export const addTownChunkFactory = (town: Town, isAll: boolean) => ({
  action: 'add',
  dialog: 'chunk',
  color: Color.GREEN,
  userId: isAll ? 0 : town.user.id,
  icon: <LuSquarePlus />,
  body: <AddTownChunkForm town={town} isAll={isAll} />,
});

export const addMyTownChunkAction = (town: Town) =>
  addTownChunkFactory(town, false);

export const addUserTownChunkAction = (town: Town) =>
  addTownChunkFactory(town, true);
