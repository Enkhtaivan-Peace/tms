import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class ChangeWorkStatusDto {
  @IsInt()
  toStatusId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;
}
