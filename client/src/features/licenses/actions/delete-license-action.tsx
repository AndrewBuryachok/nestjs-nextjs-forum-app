import { LuTrash2 } from 'react-icons/lu';
import { User } from '@/features/users/types';
import TakeLicenseForm from '../forms/delete-license-form';
import { Color } from '@/constants/colors';
import { Role } from '@/constants/roles';

export const deleteLicenseAction = (user: User) => ({
  action: 'delete',
  dialog: 'license',
  color: Color.RED,
  role: Role.ECONOMIST,
  icon: <LuTrash2 />,
  body: <TakeLicenseForm user={user} />,
});
