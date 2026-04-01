import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import {
  CreatePlaceDto,
  CreatePlaceWithCardAndUserDto,
  CreatePlaceWithCardDto,
} from '../places/place.dto';

export class ShopIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  shopId: number;
}

export class CreateShopDto extends CreatePlaceWithCardDto {}

export class CreateShopWithUserDto extends CreatePlaceWithCardAndUserDto {}

export class EditShopDto extends CreatePlaceDto {}
