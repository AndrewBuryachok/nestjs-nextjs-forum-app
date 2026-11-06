import { LuBadgeMinus } from 'react-icons/lu';
import { User } from '../types';
import RemoveUserRoleForm from '../forms/remove-user-role-form';

export const removeUserRoleAction = (user: User) => ({
  action: 'remove',
  dialog: 'role',
  disabled: !user.roles.length,
  icon: <LuBadgeMinus />,
  body: <RemoveUserRoleForm user={user} />,
});
