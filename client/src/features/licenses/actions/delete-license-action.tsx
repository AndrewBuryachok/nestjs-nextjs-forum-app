import { LuTrash2 } from 'react-icons/lu';
import { User } from '@/features/users/types';
import DeleteLicenseForm from '../forms/delete-license-form';
import { Color } from '@/constants/colors';
import { Role } from '@/constants/roles';

export const deleteLicenseAction = (user: User) => ({
  button: true,
  action: 'delete',
  dialog: 'license',
  color: Color.RED,
  role: Role.ADMIN,
  icon: <LuTrash2 />,
  body: <DeleteLicenseForm user={user} />,
});
