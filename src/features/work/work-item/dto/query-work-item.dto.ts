import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryWorkItemDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 20;

  /**
   * Search:
   * code
   * title
   * description
   */
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * Filter by template
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  workTemplateId?: number;

  /**
   * Filter by current status
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  statusId?: number;

  /**
   * HIGH
   * MEDIUM
   * LOW
   */
  @IsOptional()
  @IsString()
  priority?: string;

  /**
   * Creator
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  createdBy?: number;
}
