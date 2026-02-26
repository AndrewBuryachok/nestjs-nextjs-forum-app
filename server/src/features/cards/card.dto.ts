import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

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

export class CreateCardDto extends EditCardDto {}

export class CreateCardWithUserDto extends CreateCardDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}

export class UpdateCardUserDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}
