import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  name: string;
}

export class ExtCreateCardDto extends CreateCardDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
