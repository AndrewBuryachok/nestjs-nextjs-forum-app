import { Role } from '@/constants/roles';

export interface BaseUser {
  id: number;
  nick: string;
  avatar: string;
}

export interface BaseUserWithRoles extends BaseUser {
  roles: Role[];
}

export interface User extends BaseUserWithRoles {
  createdAt: Date;
}
