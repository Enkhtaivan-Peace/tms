import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class WorkCommentFilterDto {
  @IsInt()
  @IsPositive()
  workItemId!: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  page = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  limit = 20;

  @IsOptional()
  @IsString()
  search?: string;
}
