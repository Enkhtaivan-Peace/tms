import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateWorkCommentDto {
  @IsNumber()
  workItemId!: number;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
