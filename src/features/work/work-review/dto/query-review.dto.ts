import { IsOptional } from 'class-validator';

export class QueryReviewDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  search?: string;
}
