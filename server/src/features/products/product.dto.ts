import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Item, Unit } from '../../common/enums';

export class ProductIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  productId: number;
}

export class EditProductAmountAndPriceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(27)
  amount: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  price: number;
}

export class EditProductDto extends EditProductAmountAndPriceDto {
  @IsNotEmpty()
  @IsEnum(Item)
  item: Item;

  @IsDefined()
  @IsString()
  @MaxLength(32)
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(64)
  batch: number;

  @IsNotEmpty()
  @IsEnum(Unit)
  unit: Unit;
}

export class CreateProductWithShopDto extends EditProductDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  shopId: number;
}

export class CreateProductWithShopAndUserDto extends CreateProductWithShopDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}

export class CreateProductWithRentDto extends EditProductDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  rentId: number;
}

export class CreateProductWithRentAndUserDto extends CreateProductWithRentDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
