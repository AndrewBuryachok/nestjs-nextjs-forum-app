import { LuEye } from 'react-icons/lu';
import { Town } from '../types';
import ViewTownForm from '../forms/view-town-form';

export const viewTownAction = (town: Town) => ({
  action: 'view',
  dialog: 'town',
  icon: <LuEye />,
  body: <ViewTownForm town={town} />,
});
