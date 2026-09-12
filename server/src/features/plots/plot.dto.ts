import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { CreatePlaceDto } from '../places/place.dto';

export class CreatePlotDto extends CreatePlaceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  marketId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  price: number;
}

export class CreatePlotWithUserDto extends CreatePlotDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
