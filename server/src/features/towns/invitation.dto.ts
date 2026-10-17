import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
