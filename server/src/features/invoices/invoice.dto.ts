import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateInvoiceDto {
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
  sum: number;

  @IsDefined()
  @IsString()
  @MaxLength(32)
  description: string;
}

export class CreateInvoiceWithUserDto extends CreateInvoiceDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  senderUserId: number;
}
