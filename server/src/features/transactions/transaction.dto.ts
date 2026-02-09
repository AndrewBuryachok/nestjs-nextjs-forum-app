import { IsInt, IsNotEmpty, Min } from 'class-validator';

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
