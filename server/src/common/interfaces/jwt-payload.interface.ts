import { Role } from '../enums';

export class JwtPayload {
  sub: number;
  nick: string;
  roles: Role[];
}

export class JwtPayloadWithToken extends JwtPayload {
  token: string;
}
