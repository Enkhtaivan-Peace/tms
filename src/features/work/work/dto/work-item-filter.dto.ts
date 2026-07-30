import { IsEnum, IsOptional, IsNumber } from 'class-validator';

import { WorkStatus } from '../enums/work-status.enum';

export class WorkItemFilterDto {
  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsEnum(WorkStatus)
  status?: WorkStatus;
}
