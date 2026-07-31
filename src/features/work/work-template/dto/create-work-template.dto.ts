import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateWorkTemplateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  code!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  workTypeId!: number;

  @IsOptional()
  @IsInt()
  workCategoryId?: number;

  @IsString()
  @IsNotEmpty()
  codePrefix!: string;

  @IsOptional()
  @IsString()
  sequenceKey?: string;

  @IsInt()
  initialStatusId!: number;

  @IsOptional()
  @IsString()
  defaultPriority?: string;

  @IsOptional()
  defaultEstimatedHours?: number;

  @IsOptional()
  defaultDueDays?: number;

  @IsOptional()
  @IsBoolean()
  allowAttachment?: boolean;

  @IsOptional()
  @IsBoolean()
  allowComment?: boolean;

  @IsOptional()
  @IsBoolean()
  requireApproval?: boolean;
}
