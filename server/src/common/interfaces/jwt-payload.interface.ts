export class JwtPayload {
  sub: number;
}

export class ExtJwtPayload extends JwtPayload {
  nick: string;
}
