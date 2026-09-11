import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {
  CreatePlaceDto,
  CreatePlaceWithCardAndUserDto,
  CreatePlaceWithCardDto,
} from '../places/place.dto';

export class MarketIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  marketId: number;
}

export class CreateMarketDto extends CreatePlaceWithCardDto {}

export class CreateMarketWithUserDto extends CreatePlaceWithCardAndUserDto {}

export class EditMarketDto extends CreatePlaceDto {}
