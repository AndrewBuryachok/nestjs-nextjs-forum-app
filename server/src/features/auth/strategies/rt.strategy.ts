import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';
import { AuthError } from '../auth-errors.enum';
import { ExtJwtPayload, JwtPayload } from '../../../common/interfaces';
import { compareData } from '../../../common/utils';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('RT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<ExtJwtPayload> {
    const token = req.get('Authorization')!.replace('Bearer ', '').trim();
    const user = await this.usersService.findUserById(payload.sub);
    if (!user || !user.token || !(await compareData(token, user.token))) {
      throw new UnauthorizedException(AuthError.INVALID_REFRESH_TOKEN);
    }
    return { ...payload, nick: user.nick, roles: user.roles };
  }
}
