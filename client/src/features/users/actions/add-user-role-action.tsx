import { LuBadgePlus } from 'react-icons/lu';
import { User } from '../types';
import AddUserRoleForm from '../forms/add-user-role-form';
import { Color } from '@/constants/colors';
import { Role } from '@/constants/roles';

export const addUserRoleAction = (user: User) => ({
  action: 'add',
  dialog: 'role',
  color: Color.GREEN,
  disabled: user.roles.length === Object.values(Role).length,
  icon: <LuBadgePlus />,
  body: <AddUserRoleForm user={user} />,
});
