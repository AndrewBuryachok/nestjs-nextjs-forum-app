import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Sort } from '../enums';

export class Request {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  skip?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  user?: number;

  @IsOptional()
  @IsEnum(Sort)
  sort?: Sort;
}
