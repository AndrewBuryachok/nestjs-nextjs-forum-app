import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FineIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  fineId: number;
}

export class EditFineDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  sum: number;

  @IsDefined()
  @IsString()
  @MaxLength(32)
  description: string;
}

export class CreateFineDto extends EditFineDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  senderCardId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  receiverUserId: number;
}

export class CreateFineWithUserDto extends CreateFineDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  senderUserId: number;
}

export class PayFineDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cardId: number;
}
