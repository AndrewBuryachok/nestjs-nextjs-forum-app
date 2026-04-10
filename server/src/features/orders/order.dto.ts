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

export class OrderIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  orderId: number;
}

export class EditOrderDto {
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
  @Max(27)
  amount: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(64)
  batch: number;

  @IsNotEmpty()
  @IsEnum(Unit)
  unit: Unit;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  sum: number;
}

export class ExtEditOrderDto extends EditOrderDto {
  orderId: number;
  myId: number;
  isAll: boolean;
}

export class CreateOrderDto extends EditOrderDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  lockerId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cardId: number;
}

export class ExtCreateOrderDto extends CreateOrderDto {
  myId: number;
  isAll: boolean;
}

export class DeleteOrderDto {
  orderId: number;
  myId: number;
  isAll: boolean;
}

export class TakeOrderDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cardId: number;
}

export class ExtTakeOrderDto extends TakeOrderDto {
  orderId: number;
  myId: number;
  isAll: boolean;
}

export class CancelOrderDto {
  orderId: number;
  myId: number;
  isAll: boolean;
}
