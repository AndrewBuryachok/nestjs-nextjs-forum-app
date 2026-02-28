import { BaseUserWithRoles } from '@/features/users/types';

export interface Tokens {
  user: BaseUserWithRoles;
  access: string;
  refresh: string;
}
