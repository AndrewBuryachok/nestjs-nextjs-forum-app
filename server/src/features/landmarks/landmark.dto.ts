import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePlaceDto, CreatePlaceWithUserDto } from '../places/place.dto';

export class LandmarkIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  landmarkId: number;
}

export class CreateLandmarkDto extends CreatePlaceDto {}

export class CreateLandmarkWithUserDto extends CreatePlaceWithUserDto {}

export class EditLandmarkDto extends CreatePlaceDto {}
