import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateRentDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  plotId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cardId: number;
}

export class CreateRentWithUserDto extends CreateRentDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
