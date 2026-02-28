import { Role } from '../enums';

export class JwtPayload {
  sub: number;
}

export class ExtJwtPayload extends JwtPayload {
  nick: string;
  roles: Role[];
}
