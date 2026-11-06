import { LuLock } from 'react-icons/lu';
import { User } from '../types';
import ChangeUserPasswordForm from '../forms/change-user-password-form';

export const changeUserPasswordAction = (user: User) => ({
  action: 'change',
  dialog: 'password',
  icon: <LuLock />,
  body: <ChangeUserPasswordForm user={user} />,
});
