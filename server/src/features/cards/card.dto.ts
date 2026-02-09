import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { CreateTransactionDto } from '../transactions/transaction.dto';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  name: string;
}

export class ExtCreateCardDto extends CreateCardDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}

export class UpdateCardBalanceDto extends CreateTransactionDto {}
