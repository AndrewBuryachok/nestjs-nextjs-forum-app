import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ComplaintIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  complaintId: number;
}

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

export class CloseComplaintDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  text: string;
}

export class CreateComplaintMessageDto extends CloseComplaintDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  complaintId: number;
}
