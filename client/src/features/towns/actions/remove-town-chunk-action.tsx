import { LuGrid2X2X } from 'react-icons/lu';
import { Town } from '../types';
import RemoveTownChunkForm from '../forms/remove-town-chunk-form';

export const removeTownChunkFactory = (town: Town, isAll: boolean) => ({
  action: 'remove',
  dialog: 'chunk',
  disabled: !town.chunks,
  userId: isAll ? 0 : town.user.id,
  icon: <LuGrid2X2X />,
  body: <RemoveTownChunkForm town={town} isAll={isAll} />,
});

export const removeMyTownChunkAction = (town: Town) =>
  removeTownChunkFactory(town, false);

export const removeUserTownChunkAction = (town: Town) =>
  removeTownChunkFactory(town, true);
