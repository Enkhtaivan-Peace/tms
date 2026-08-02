import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { Transform } from 'class-transformer';

import { PaginationDto } from 'src/common/dto/pagination.dto';

import { WorkActivityAction } from '../enums/work-activity-action.enum';

export class WorkActivityFilterDto extends PaginationDto {
  /**
   * Filter by WorkItem
   *
   * GET:
   * /work-activities?workItemId=10
   */
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  workItemId?: number;

  /**
   * Filter by actor
   */
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  actorId?: number;

  /**
   * Filter by action
   *
   * CREATED
   * UPDATED
   * STATUS_CHANGED
   */
  @IsOptional()
  @IsEnum(WorkActivityAction)
  action?: WorkActivityAction;
}
