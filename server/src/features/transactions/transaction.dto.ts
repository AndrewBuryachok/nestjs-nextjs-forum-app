import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Item, TransactionType } from '../../common/enums';

export class TransactionIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  transactionId: number;
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cardId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  sum: number;
}

export class CreateTransactionWithTypeAndDescriptionDto extends CreateTransactionDto {
  type: TransactionType;
  description: string;
  item?: Item;
}

export class CreateTransferDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  senderCardId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  receiverUserId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  receiverCardId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  sum: number;

  @IsDefined()
  @IsString()
  @MaxLength(32)
  description: string;
}

export class CreateTransferWithUserDto extends CreateTransferDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  senderUserId: number;
}

export class CreateTransferWithUserAndTypeDto extends CreateTransferWithUserDto {
  type: TransactionType;
  item?: Item;
}
