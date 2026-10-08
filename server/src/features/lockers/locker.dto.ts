import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePlaceDto, CreatePlaceWithUserDto } from '../places/place.dto';

export class LockerIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  lockerId: number;
}

export class CreateLockerDto extends CreatePlaceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cells: number;
}

export class CreateLockerWithUserDto extends CreatePlaceWithUserDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cells: number;
}

export class EditLockerDto extends CreatePlaceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cells: number;
}
