import { LuPencil } from 'react-icons/lu';
import { User } from '../types';
import EditUserForm from '../forms/edit-user-form';
import { Color } from '@/constants/colors';

export const editUserAction = (user: User) => ({
  action: 'edit',
  dialog: 'user',
  color: Color.YELLOW,
  icon: <LuPencil />,
  body: <EditUserForm user={user} />,
});
