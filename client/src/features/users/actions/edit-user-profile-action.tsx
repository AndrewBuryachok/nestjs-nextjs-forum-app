import { LuUserPen } from 'react-icons/lu';
import { User } from '../types';
import EditUserProfileForm from '../forms/edit-user-profile-form';
import { Color } from '@/constants/colors';

export const editUserProfileAction = (user: User) => ({
  action: 'edit',
  dialog: 'profile',
  color: Color.YELLOW,
  icon: <LuUserPen />,
  body: <EditUserProfileForm user={user} />,
});
