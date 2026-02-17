export class JwtPayload {
  sub: number;
  nick: string;
}

export class JwtPayloadWithToken extends JwtPayload {
  token: string;
}
