import { PartialType } from '@nestjs/swagger';
import { CreateWorkCommentDto } from './create-work-comment.dto';

export class UpdateWorkTypeDto extends PartialType(CreateWorkCommentDto) {}
