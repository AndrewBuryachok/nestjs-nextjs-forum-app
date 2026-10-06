import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateComplaintDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  receiverUserId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  title: string;
}

export class CreateComplaintWithUserDto extends CreateComplaintDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  senderUserId: number;
}
