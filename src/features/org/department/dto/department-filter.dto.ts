import { IsOptional, IsNumber, IsString } from 'class-validator';

export class DepartmentFilterDto {
  @IsOptional()
  @IsNumber()
  organizationId?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 20;
}
