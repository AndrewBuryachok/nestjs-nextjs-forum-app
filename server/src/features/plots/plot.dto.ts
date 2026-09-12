import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePlaceDto } from '../places/place.dto';

export class PlotIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  plotId: number;
}

export class EditPlotDto extends CreatePlaceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  price: number;
}

export class CreatePlotDto extends EditPlotDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  marketId: number;
}

export class CreatePlotWithUserDto extends CreatePlotDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
