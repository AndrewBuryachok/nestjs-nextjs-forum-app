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
import {
  ChangeMyPasswordDto,
  ChangeUserPasswordDto,
  EditUserProfileDto,
  UpdateUserRoleDto,
  UserIdDto,
} from './user.dto';
import { MyId, Public, Roles } from '../../common/decorators';
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

  @Patch('me/profile')
  editMyProfile(
    @MyId() myId: number,
    @Body() dto: EditUserProfileDto,
  ): Promise<void> {
    return this.usersService.editUserProfile(myId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch(':userId/profile')
  editUserProfile(
    @Param() { userId }: UserIdDto,
    @Body() dto: EditUserProfileDto,
  ): Promise<void> {
    return this.usersService.editUserProfile(userId, dto);
  }

  @Patch('me/password')
  changeMyPassword(
    @MyId() myId: number,
    @Body() dto: ChangeMyPasswordDto,
  ): Promise<void> {
    return this.usersService.changeMyPassword(myId, dto);
  }

  @Roles([Role.ADMIN])
  @Patch(':userId/password')
  changeUserPassword(
    @Param() { userId }: UserIdDto,
    @Body() dto: ChangeUserPasswordDto,
  ): Promise<void> {
    return this.usersService.changeUserPassword(userId, dto);
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
