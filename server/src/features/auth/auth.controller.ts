import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { MyId, MyToken, Public } from '../../common/decorators';
import { NickThrottlerGuard, RtGuard } from '../../common/guards';
import { Tokens } from '../../common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(NickThrottlerGuard)
  @Post('register')
  register(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @Public()
  @UseGuards(NickThrottlerGuard)
  @Post('login')
  login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Post('logout')
  logout(@MyId() myId: number): Promise<void> {
    return this.authService.logout(myId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  refresh(@MyId() myId: number, @MyToken() token: string): Promise<Tokens> {
    return this.authService.refresh(myId, token);
  }
}
