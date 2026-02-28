import { Role } from '@/constants/roles';

export function canAccess(rRoles: Role[], uRoles?: Role[]) {
  return (
    !!uRoles && (!rRoles.length || rRoles.some((role) => uRoles.includes(role)))
  );
}
