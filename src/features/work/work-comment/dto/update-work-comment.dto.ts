import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateWorkCommentDto {
  @IsString()
  @IsNotEmpty()
  content!: string;
}
