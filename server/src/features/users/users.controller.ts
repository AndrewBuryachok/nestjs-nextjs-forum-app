import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { EditUserProfileDto, UpdateUserRoleDto, UserIdDto } from './user.dto';
import { Public, Roles } from '../../common/decorators';
import { Request, Response } from '../../common/interfaces';
import { Role } from '../../common/enums';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Get()
  getMainUsers(@Query() req: Request): Promise<Response<User>> {
    return this.usersService.getMainUsers(req);
  }

  @Roles([Role.ADMIN])
  @Get('all')
  getAllUsers(@Query() req: Request): Promise<Response<User>> {
    return this.usersService.getAllUsers(req);
  }

  @Public()
  @Get('all/select')
  selectAllUsers(): Promise<User[]> {
    return this.usersService.selectAllUsers();
  }

  @Public()
  @Get(':userId/select')
  selectOneUser(@Param() { userId }: UserIdDto): Promise<User> {
    return this.usersService.selectOneUser(userId);
  }

  @Roles([Role.ADMIN])
  @Patch(':userId/profile')
  editUserProfile(
    @Param() { userId }: UserIdDto,
    @Body() dto: EditUserProfileDto,
  ): Promise<void> {
    return this.usersService.editUserProfile(userId, dto);
  }

  @Roles([Role.ADMIN])
  @Post(':userId/roles')
  addUserRole(
    @Param() { userId }: UserIdDto,
    @Body() dto: UpdateUserRoleDto,
  ): Promise<void> {
    return this.usersService.addUserRole(userId, dto);
  }

  @Roles([Role.ADMIN])
  @Delete(':userId/roles')
  removeUserRole(
    @Param() { userId }: UserIdDto,
    @Body() dto: UpdateUserRoleDto,
  ): Promise<void> {
    return this.usersService.removeUserRole(userId, dto);
  }
}
