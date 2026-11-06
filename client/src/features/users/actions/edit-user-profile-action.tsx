import { LuUserPen } from 'react-icons/lu';
import { User } from '../types';
import EditUserProfileForm from '../forms/edit-user-profile-form';

export const editUserProfileAction = (user: User) => ({
  action: 'edit',
  dialog: 'profile',
  icon: <LuUserPen />,
  body: <EditUserProfileForm user={user} />,
});
