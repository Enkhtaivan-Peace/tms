import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateWorkCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content!: string;
}
