import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export enum WorkPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export class CreateWorkItemDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  /**
   * WorkTemplate
   *
   * Feature Development
   */
  @IsInt()
  workTemplateId!: number;

  @IsEnum(WorkPriority)
  @IsOptional()
  priority?: WorkPriority = WorkPriority.MEDIUM;

  @IsOptional()
  @IsInt()
  @Min(0)
  estimatedHours?: number;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}
