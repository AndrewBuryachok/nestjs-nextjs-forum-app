import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  cardId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  sum: number;
}

export class ExtCreateTransactionDto extends CreateTransactionDto {
  myId: number;
}

export class CreateTransactionWithDescriptionDto extends CreateTransactionDto {
  description: string;
}

export class ExtCreateTransactionWithDescriptionDto extends CreateTransactionWithDescriptionDto {
  myId: number;
}

export class CreateTransferDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  senderCardId: number;

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

export class ExtCreateTransferDto extends CreateTransferDto {
  myId: number;
  isAll: boolean;
}

export class DeleteTransactionDto extends TransactionIdDto {}
