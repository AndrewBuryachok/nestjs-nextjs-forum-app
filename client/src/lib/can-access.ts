import { Role } from '@/constants/roles';

export function canAccess(isPublic: boolean, rRoles: Role[], uRoles?: Role[]) {
  return (
    isPublic ||
    (!!uRoles &&
      (!rRoles.length || rRoles.some((role) => uRoles.includes(role))))
  );
}
