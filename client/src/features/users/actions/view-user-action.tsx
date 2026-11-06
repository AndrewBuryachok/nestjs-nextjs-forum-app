import { LuEye } from 'react-icons/lu';
import { User } from '../types';
import ViewUserForm from '../forms/view-user-form';

export const viewUserAction = (user: User) => ({
  action: 'view',
  dialog: 'user',
  icon: <LuEye />,
  body: <ViewUserForm user={user} />,
});
