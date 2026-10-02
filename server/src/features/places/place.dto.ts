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
import {
  PLACE_X_MAX,
  PLACE_X_MIN,
  PLACE_Y_MAX,
  PLACE_Y_MIN,
} from '../../common/constants';

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
  @Min(PLACE_X_MIN)
  @Max(PLACE_X_MAX)
  x: number;

  @IsNotEmpty()
  @IsInt()
  @Min(PLACE_Y_MIN)
  @Max(PLACE_Y_MAX)
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
