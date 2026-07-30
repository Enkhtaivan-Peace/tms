import { IsOptional, IsBoolean, IsInt, IsString } from 'class-validator';

import { Type } from 'class-transformer';

export class QueryWorkStatusDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit: number = 20;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;

  @IsOptional()
  @IsString()
  category?: string;
}
