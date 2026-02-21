import { BaseUser } from '@/features/users/types';

export interface Tokens {
  user: BaseUser;
  access: string;
  refresh: string;
}
