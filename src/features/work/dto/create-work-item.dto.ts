import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { WorkType } from '../enums/work-type.enum';

import { WorkPriority } from '../enums/work-priority.enum';

export class CreateWorkItemDto {
  @IsNumber()
  departmentId!: number;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(WorkType)
  type?: WorkType;

  @IsOptional()
  @IsEnum(WorkPriority)
  priority?: WorkPriority;
}
