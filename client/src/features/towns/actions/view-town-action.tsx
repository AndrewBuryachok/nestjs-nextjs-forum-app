import { LuEye } from 'react-icons/lu';
import { Town } from '../types';
import ViewTownForm from '../forms/view-town-form';
import { Color } from '@/constants/colors';

export const viewTownAction = (town: Town) => ({
  action: 'view',
  dialog: 'town',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewTownForm town={town} />,
});
