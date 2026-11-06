import { LuGrid2X2 } from 'react-icons/lu';
import { Town } from '../types';
import ViewTownChunksForm from '../forms/view-town-chunks-form';

export const viewTownChunksAction = (town: Town) => ({
  button: true,
  number: town.chunks,
  action: 'view',
  dialog: 'chunks',
  icon: <LuGrid2X2 />,
  body: <ViewTownChunksForm town={town} />,
});
