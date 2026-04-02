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

export class CreateLockerDto extends CreatePlaceDto {}

export class ExtCreateLockerDto extends CreatePlaceWithUserDto {}

export class EditLockerDto extends CreatePlaceDto {}

export class ExtEditLockerDto extends EditLockerDto {
  lockerId: number;
  myId: number;
  isAll: boolean;
}

export class DeleteLockerDto extends LockerIdDto {
  myId: number;
  isAll: boolean;
}
