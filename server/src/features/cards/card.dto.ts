import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTransactionDto } from '../transactions/transaction.dto';

export class CardIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  cardId: number;
}

export class EditCardDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  name: string;
}

export class ExtEditCardDto extends EditCardDto {
  cardId: number;
  myId: number;
  isAll: boolean;
}

export class CreateCardDto extends EditCardDto {}

export class ExtCreateCardDto extends CreateCardDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}

export class DeleteCardDto extends CardIdDto {
  myId: number;
  isAll: boolean;
}

export class UpdateCardUserDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}

export class ExtUpdateCardUserDto extends UpdateCardUserDto {
  cardId: number;
  myId: number;
  isAll: boolean;
}

export class UpdateCardBalanceDto extends CreateTransactionDto {}
