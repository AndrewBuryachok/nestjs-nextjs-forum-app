import { LuEye } from 'react-icons/lu';
import { User } from '../types';
import ViewUserForm from '../forms/view-user-form';
import { Color } from '@/constants/colors';

export const viewUserAction = (user: User) => ({
  action: 'view',
  dialog: 'user',
  color: Color.BLUE,
  icon: <LuEye />,
  body: <ViewUserForm user={user} />,
});
