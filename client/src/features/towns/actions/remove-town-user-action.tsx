import { LuUserMinus } from 'react-icons/lu';
import { Town } from '../types';
import RemoveTownUserForm from '../forms/remove-town-user-form';
import { Color } from '@/constants/colors';

export const removeTownUserFactory = (town: Town, isAll: boolean) => ({
  action: 'remove',
  dialog: 'resident',
  color: Color.RED,
  disabled: town.users === 1,
  userId: isAll ? 0 : town.user.id,
  icon: <LuUserMinus />,
  body: <RemoveTownUserForm town={town} isAll={isAll} />,
});

export const removeMyTownUserAction = (town: Town) =>
  removeTownUserFactory(town, false);

export const removeUserTownUserAction = (town: Town) =>
  removeTownUserFactory(town, true);
