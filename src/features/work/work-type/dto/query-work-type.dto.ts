import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

import { Type } from 'class-transformer';

export class QueryWorkTypeDto {
  @ApiPropertyOptional({
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @ApiPropertyOptional({
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;

  @ApiPropertyOptional({
    example: 'task',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 'name',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    enum: ['ASC', 'DESC'],
    default: 'ASC',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortDirection?: 'ASC' | 'DESC';
}
