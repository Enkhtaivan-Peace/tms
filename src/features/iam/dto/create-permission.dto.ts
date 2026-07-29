import { IsString, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  code!: string;

  @IsString()
  module!: string;

  @IsString()
  action!: string;

  @IsOptional()
  description?: string;
}
