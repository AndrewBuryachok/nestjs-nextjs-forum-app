import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  townId: number;
}
