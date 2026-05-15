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
import { ExtCreatePurchaseDto } from '../purchases/purchase.dto';
import { Item, Unit } from '../../common/enums';

export class GoodIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  goodId: number;
}

export class EditGoodAmountAndPriceDto {
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

export class ExtEditGoodAmountAndPriceDto extends EditGoodAmountAndPriceDto {
  goodId: number;
  myId: number;
  isAll: boolean;
}

export class EditGoodDto extends EditGoodAmountAndPriceDto {
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

export class ExtEditGoodDto extends EditGoodDto {
  goodId: number;
  myId: number;
  isAll: boolean;
}

export class CreateGoodDto extends EditGoodDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  shopId: number;
}

export class ExtCreateGoodDto extends CreateGoodDto {
  myId: number;
  isAll: boolean;
}

export class DeleteGoodDto extends GoodIdDto {
  myId: number;
  isAll: boolean;
}

export class BuyGoodDto extends ExtCreatePurchaseDto {}
