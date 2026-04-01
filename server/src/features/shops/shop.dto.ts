import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePlaceDto, CreatePlaceWithCardDto } from '../places/place.dto';

export class ShopIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  shopId: number;
}

export class CreateShopDto extends CreatePlaceWithCardDto {}

export class ExtCreateShopDto extends CreateShopDto {
  myId: number;
  isAll: boolean;
}

export class EditShopDto extends CreatePlaceDto {}

export class ExtEditShopDto extends EditShopDto {
  shopId: number;
  myId: number;
  isAll: boolean;
}

export class DeleteShopDto extends ShopIdDto {
  myId: number;
  isAll: boolean;
}
