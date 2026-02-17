import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AuthDto } from '../auth/auth.dto';

export class UserIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  userId: number;
}

export class CreateUserDto extends AuthDto {}
