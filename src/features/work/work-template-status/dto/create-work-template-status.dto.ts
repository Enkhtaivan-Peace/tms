import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class CreateWorkTemplateStatusDto {
  @IsInt()
  workTemplateId!: number;

  @IsInt()
  workStatusId!: number;

  /**
   * Template workflow-ийн эхний status
   */
  @IsOptional()
  @IsBoolean()
  isInitial?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
