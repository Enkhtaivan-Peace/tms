import { ApiProperty } from '@nestjs/swagger';

export class WorkCategoryResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({
    required: false,
  })
  description?: string;

  @ApiProperty({
    required: false,
  })
  color?: string;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  sortOrder!: number;
}
