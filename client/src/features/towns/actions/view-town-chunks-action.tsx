import { Town } from '../types';
import ViewTownChunksForm from '../forms/view-town-chunks-form';

export const viewTownChunksAction = (town: Town) => ({
  action: 'view',
  dialog: 'chunks',
  icon: `${town.chunks}/${process.env.NEXT_PUBLIC_MAX_TOWN_CHUNKS!.split(',')[town.level - 1]}`,
  body: <ViewTownChunksForm town={town} />,
});
