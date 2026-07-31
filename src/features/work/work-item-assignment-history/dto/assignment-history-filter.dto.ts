import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';
import { AssignmentHistoryAction } from '../enum/work-item-assignment-action.enum';

export class AssignmentHistoryFilterDto {
  /**
   * Pagination
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 20;

  /**
   * Filter by action
   */
  @IsOptional()
  @IsEnum(AssignmentHistoryAction)
  action?: AssignmentHistoryAction;

  /**
   * Filter by assignment
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  assignmentId?: number;

  /**
   * Filter by WorkItem
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  workItemId?: number;

  /**
   * Who changed
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  changedBy?: number;

  /**
   * New assigned user
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  newUserId?: number;

  /**
   * New assigned team
   */
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  newTeamId?: number;
}
