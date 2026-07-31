import { IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name!: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  isSystem?: boolean;
}
