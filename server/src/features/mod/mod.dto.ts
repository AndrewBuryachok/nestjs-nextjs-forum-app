import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SenderReceiverDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  senderNick: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  receiverNick: string;
}
