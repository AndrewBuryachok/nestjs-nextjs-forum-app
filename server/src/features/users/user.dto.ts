import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
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

export class UserNickDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  nick: string;
}

export class CreateUserDto extends AuthDto {}

export class EditUserProfileDto {
  @ValidateIf((_, value) => value !== '')
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  avatar: string;
}

export class ChangeMyPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  newPassword: string;
}

export class ChangeUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
