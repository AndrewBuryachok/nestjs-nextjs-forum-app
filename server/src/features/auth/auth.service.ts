import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { AuthDto } from './auth.dto';
import { AuthError } from './auth-errors.enum';
import { Tokens } from '../../common/interfaces';
import { compareData, hashData } from '../../common/utils';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(dto: AuthDto): Promise<Tokens> {
    const password = await hashData(dto.password);
    const user = await this.usersService.createUser({ ...dto, password });
    return this.signTokens(user);
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.usersService.findUserByNick(dto.nick);
    if (!user || !(await compareData(dto.password, user.password))) {
      throw new UnauthorizedException(AuthError.INVALID_CREDENTIALS);
    }
    return this.signTokens(user);
  }

  async logout(myId: number): Promise<void> {
    await this.usersService.resetUserToken(myId);
  }

  async refresh(myId: number): Promise<Tokens> {
    const user = await this.usersService.findUserById(myId);
    return this.signTokens(user!);
  }

  private async signTokens(user: User): Promise<Tokens> {
    const payload = { sub: user.id };
    const access = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('AT_SECRET'),
      expiresIn: this.configService.getOrThrow('AT_EXPIRES_IN'),
    });
    const refresh = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('RT_SECRET'),
      expiresIn: this.configService.getOrThrow('RT_EXPIRES_IN'),
    });
    const token = await hashData(refresh);
    await this.usersService.setUserToken(user.id, token);
    const { id, nick, avatar, roles } = user;
    return { user: { id, nick, avatar, roles }, access, refresh };
  }
}
