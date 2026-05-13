import { IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AuthDto } from '../auth/auth.dto';
import { Role } from '../../common/enums';

export class UserIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  userId: number;
}

export class CreateUserDto extends AuthDto {}

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export class ExtUpdateUserRoleDto extends UpdateUserRoleDto {
  userId: number;
}
