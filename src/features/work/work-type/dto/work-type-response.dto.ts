import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkTypeResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty({
    example: 'TASK',
  })
  code!: string;

  @ApiProperty({
    example: 'Task',
  })
  name!: string;

  @ApiPropertyOptional()
  color?: string;

  @ApiPropertyOptional()
  icon?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  isDefault!: boolean;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  sortOrder!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiPropertyOptional()
  deletedAt?: Date;
}
