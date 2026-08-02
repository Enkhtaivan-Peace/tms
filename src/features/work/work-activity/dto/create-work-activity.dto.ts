import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
} from 'class-validator';

import { WorkActivityAction } from '../enums/work-activity-action.enum';

export class CreateWorkActivityDto {
  /**
   * Work Item
   */
  @IsNumber()
  @IsNotEmpty()
  workItemId!: number;

  /**
   * Activity action
   */
  @IsEnum(WorkActivityAction)
  action!: WorkActivityAction;

  /**
   * Changed field
   *
   * Example:
   * status
   * priority
   * dueDate
   */
  @IsOptional()
  @IsString()
  fieldName?: string;

  /**
   * Previous value
   */
  @IsOptional()
  @IsObject()
  oldValue?: Record<string, unknown>;

  /**
   * New value
   */
  @IsOptional()
  @IsObject()
  newValue?: Record<string, unknown>;

  /**
   * Human readable message
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * Actor user id
   */
  @IsNumber()
  @IsNotEmpty()
  actorId!: number;
}
