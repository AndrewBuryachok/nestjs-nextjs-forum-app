import { LuTrash2 } from 'react-icons/lu';
import { Town } from '../types';
import DeleteTownForm from '../forms/delete-town-form';

export const deleteTownFactory = (town: Town, isAll: boolean) => ({
  danger: true,
  action: 'delete',
  dialog: 'town',
  userId: isAll ? 0 : town.user.id,
  icon: <LuTrash2 />,
  body: <DeleteTownForm town={town} isAll={isAll} />,
});

export const deleteMyTownAction = (town: Town) =>
  deleteTownFactory(town, false);

export const deleteUserTownAction = (town: Town) =>
  deleteTownFactory(town, true);
