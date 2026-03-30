import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  goodId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  cardId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(27)
  amount: number;
}

export class ExtCreatePurchaseDto extends CreatePurchaseDto {
  myId: number;
  isAll: boolean;
}
