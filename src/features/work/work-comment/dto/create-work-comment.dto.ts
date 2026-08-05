import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateWorkCommentDto {
  @IsInt()
  @Min(1)
  workItemId!: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  parentCommentId?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content!: string;
}
