import { LuTrash2 } from 'react-icons/lu';
import { Town } from '../types';
import DeleteTownForm from '../forms/delete-town-form';
import { Color } from '@/constants/colors';

export const deleteTownFactory = (town: Town, isAll: boolean) => ({
  action: 'delete',
  dialog: 'town',
  color: Color.RED,
  icon: <LuTrash2 />,
  body: <DeleteTownForm town={town} isAll={isAll} />,
});

export const deleteMyTownAction = (town: Town) =>
  deleteTownFactory(town, false);

export const deleteUserTownAction = (town: Town) =>
  deleteTownFactory(town, true);
