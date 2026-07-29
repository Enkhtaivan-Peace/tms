import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsNumber()
  departmentId!: number;

  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  managerId?: number;
}
