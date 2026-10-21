import { Town } from '../types';
import ViewTownChunksForm from '../forms/view-town-chunks-form';

export const viewTownChunksAction = (town: Town) => ({
  action: 'view',
  dialog: 'chunks',
  icon: town.chunks,
  body: <ViewTownChunksForm town={town} />,
});
