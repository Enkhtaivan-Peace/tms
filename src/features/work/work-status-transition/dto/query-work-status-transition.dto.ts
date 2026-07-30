import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

import { Type } from 'class-transformer';

export class QueryWorkStatusTransitionDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 20;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  fromStatusId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  toStatusId?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
