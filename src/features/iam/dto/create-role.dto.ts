import { IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  isSystem?: boolean;
}
