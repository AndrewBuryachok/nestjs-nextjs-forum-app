import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cardId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(-1000)
  @Max(1000)
  x: number;

  @IsNotEmpty()
  @IsInt()
  @Min(-1000)
  @Max(1000)
  y: number;
}

export class ExtCreateShopDto extends CreateShopDto {
  myId: number;
  isAll: boolean;
}
