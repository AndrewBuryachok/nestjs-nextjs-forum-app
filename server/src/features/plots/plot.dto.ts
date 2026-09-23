import { IsInt, IsNotEmpty, Min } from 'class-validator';
import {
  CreatePlaceWithCardAndUserDto,
  CreatePlaceWithCardDto,
} from '../places/place.dto';

export class CreatePlotDto extends CreatePlaceWithCardDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  price: number;
}

export class CreatePlotWithUserDto extends CreatePlaceWithCardAndUserDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  price: number;
}
