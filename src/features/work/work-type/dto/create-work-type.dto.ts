import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkTypeDto {
  @ApiProperty({
    example: 'TASK',
    description: 'Unique work type code',
  })
  @IsString()
  @MaxLength(30)
  code!: string;

  @ApiProperty({
    example: 'Task',
  })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({
    example: '#1890ff',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  color?: string;

  @ApiPropertyOptional({
    example: 'task-icon',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  icon?: string;

  @ApiPropertyOptional({
    example: 'General task work type',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @ApiPropertyOptional({
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
