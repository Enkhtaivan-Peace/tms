import { IsBoolean, IsInt, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';

export class QueryWorkTemplateStatusDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  workTemplateId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  workStatusId?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isInitial?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit: number = 20;
}
