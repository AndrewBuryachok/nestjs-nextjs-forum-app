import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class InvoiceIdDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  invoiceId: number;
}

export class EditInvoiceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  sum: number;

  @IsDefined()
  @IsString()
  @MaxLength(32)
  description: string;
}

export class CreateInvoiceDto extends EditInvoiceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  senderCardId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  receiverUserId: number;
}

export class CreateInvoiceWithUserDto extends CreateInvoiceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  senderUserId: number;
}

export class PayInvoiceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cardId: number;
}
