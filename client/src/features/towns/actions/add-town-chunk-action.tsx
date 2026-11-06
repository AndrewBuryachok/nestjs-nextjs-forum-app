import { LuGrid2X2Check } from 'react-icons/lu';
import { Town } from '../types';
import AddTownChunkForm from '../forms/add-town-chunk-form';

export const addTownChunkFactory = (town: Town, isAll: boolean) => ({
  action: 'add',
  dialog: 'chunk',
  disabled:
    town.chunks ===
    Number(process.env.NEXT_PUBLIC_MAX_TOWN_CHUNKS!.split(',')[town.level - 1]),
  userId: isAll ? 0 : town.user.id,
  icon: <LuGrid2X2Check />,
  body: <AddTownChunkForm town={town} isAll={isAll} />,
});

export const addMyTownChunkAction = (town: Town) =>
  addTownChunkFactory(town, false);

export const addUserTownChunkAction = (town: Town) =>
  addTownChunkFactory(town, true);
