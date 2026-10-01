import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { World } from '../../common/enums';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  name: string;

  @IsNotEmpty()
  @IsEnum(World)
  world: World;

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

export class CreatePlaceWithUserDto extends CreatePlaceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}

export class CreatePlaceWithCardDto extends CreatePlaceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cardId: number;
}

export class CreatePlaceWithCardAndUserDto extends CreatePlaceWithCardDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
