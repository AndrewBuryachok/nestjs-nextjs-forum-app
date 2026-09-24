import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RentIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  rentId: number;
}

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
