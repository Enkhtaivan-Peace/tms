import { IsOptional, IsString } from 'class-validator';

export class SubmitReviewDto {
  @IsOptional()
  @IsString()
  comment?: string;
}
