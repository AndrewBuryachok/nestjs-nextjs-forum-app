import { LuUserPlus } from 'react-icons/lu';
import { Town } from '../types';
import AddTownUserForm from '../forms/add-town-user-form';
import { Color } from '@/constants/colors';

export const addTownUserFactory = (town: Town, isAll: boolean) => ({
  action: 'add',
  dialog: 'resident',
  color: Color.GREEN,
  userId: isAll ? 0 : town.user.id,
  icon: <LuUserPlus />,
  body: <AddTownUserForm town={town} isAll={isAll} />,
});

export const addMyTownUserAction = (town: Town) =>
  addTownUserFactory(town, false);

export const addUserTownUserAction = (town: Town) =>
  addTownUserFactory(town, true);
