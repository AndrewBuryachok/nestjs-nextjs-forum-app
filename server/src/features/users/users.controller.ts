import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Public } from '../../common/decorators';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get('all/select')
  selectAllUsers(): Promise<User[]> {
    return this.usersService.selectAllUsers();
  }
}
