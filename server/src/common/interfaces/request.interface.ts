import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class Request {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  skip: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  take: number;
}
