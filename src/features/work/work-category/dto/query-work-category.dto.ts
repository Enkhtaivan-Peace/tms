import { IsOptional, IsBoolean, IsInt } from 'class-validator';

import { Type } from 'class-transformer';

export class QueryWorkCategoryDto {
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
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
