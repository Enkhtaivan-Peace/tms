import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class DepartmentFilterDto {
  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
