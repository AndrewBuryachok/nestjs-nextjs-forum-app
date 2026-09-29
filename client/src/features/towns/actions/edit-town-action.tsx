import { LuPencil } from 'react-icons/lu';
import { Town } from '../types';
import EditTownForm from '../forms/edit-town-form';
import { Color } from '@/constants/colors';

export const editTownFactory = (town: Town, isAll: boolean) => ({
  action: 'edit',
  dialog: 'town',
  color: Color.YELLOW,
  icon: <LuPencil />,
  body: <EditTownForm town={town} isAll={isAll} />,
});

export const editMyTownAction = (town: Town) => editTownFactory(town, false);

export const editUserTownAction = (town: Town) => editTownFactory(town, true);
