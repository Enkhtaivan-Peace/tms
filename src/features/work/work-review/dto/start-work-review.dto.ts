import { IsInt, IsOptional, IsString } from 'class-validator';

export class StartWorkReviewDto {
  @IsInt()
  workItemId!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
