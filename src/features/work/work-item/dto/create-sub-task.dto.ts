import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { WorkPriority } from './create-work-item.dto';

export class CreateSubTaskDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  /**
   * Child priority
   *
   * Хэрэв өгөөгүй бол
   * parent priority авна
   */
  @IsOptional()
  @IsEnum(WorkPriority)
  priority?: WorkPriority = WorkPriority.MEDIUM;

  /**
   * Estimated working hours
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  estimatedHours?: number;

  /**
   * Due date
   */
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  /**
   * Initial assignee
   */
  @IsOptional()
  @IsInt()
  assigneeId?: number;
}
