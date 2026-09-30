import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePlaceDto, CreatePlaceWithUserDto } from '../places/place.dto';

export class TownIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  townId: number;
}

export class CreateTownDto extends CreatePlaceDto {}

export class CreateTownWithUserDto extends CreatePlaceWithUserDto {}

export class EditTownDto extends CreatePlaceDto {}

export class UpdateTownUserDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
