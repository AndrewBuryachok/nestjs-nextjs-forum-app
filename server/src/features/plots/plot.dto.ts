import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {
  CreatePlaceDto,
  CreatePlaceWithCardAndUserDto,
  CreatePlaceWithCardDto,
} from '../places/place.dto';

export class PlotIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  plotId: number;
}

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

export class EditPlotDto extends CreatePlaceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  price: number;
}
