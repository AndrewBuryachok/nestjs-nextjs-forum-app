import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ShopIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  shopId: number;
}

export class EditShopDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(-1000)
  @Max(1000)
  x: number;

  @IsNotEmpty()
  @IsInt()
  @Min(-1000)
  @Max(1000)
  y: number;
}

export class ExtEditShopDto extends EditShopDto {
  shopId: number;
  myId: number;
  isAll: boolean;
}

export class CreateShopDto extends EditShopDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cardId: number;
}

export class ExtCreateShopDto extends CreateShopDto {
  myId: number;
  isAll: boolean;
}

export class DeleteShopDto extends ShopIdDto {
  myId: number;
  isAll: boolean;
}
