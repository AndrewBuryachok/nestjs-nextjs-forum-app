import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

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

export class CreateTransactionWithDescriptionDto extends CreateTransactionDto {
  description: string;
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
