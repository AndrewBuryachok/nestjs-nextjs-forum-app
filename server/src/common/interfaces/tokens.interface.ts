import { Role } from '../enums';

export class Tokens {
  user: { id: number; nick: string; avatar: string; roles: Role[] };
  access: string;
  refresh: string;
}
