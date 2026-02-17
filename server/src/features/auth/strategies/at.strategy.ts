import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { AuthError } from '../auth-errors.enum';
import { ExtJwtPayload, JwtPayload } from '../../../common/interfaces';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('AT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<ExtJwtPayload> {
    const user = await this.usersService.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException(AuthError.INVALID_ACCESS_TOKEN);
    }
    return { ...payload, nick: user.nick };
  }
}
