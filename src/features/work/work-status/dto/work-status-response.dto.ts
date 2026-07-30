import { ApiProperty } from '@nestjs/swagger';

export class WorkStatusResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  category!: string;

  @ApiProperty()
  isInitial!: boolean;

  @ApiProperty()
  isFinal!: boolean;

  @ApiProperty()
  isActive!: boolean;
}
