import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Public } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  getMainUsers(@Query() req: Request): Promise<Response<User>> {
    return this.usersService.getMainUsers(req);
  }

  @Public()
  @Get('all/select')
  selectAllUsers(): Promise<User[]> {
    return this.usersService.selectAllUsers();
  }
}
