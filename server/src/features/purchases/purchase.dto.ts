import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  productId: number;

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

export class CreatePurchaseWithUserDto extends CreatePurchaseDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
