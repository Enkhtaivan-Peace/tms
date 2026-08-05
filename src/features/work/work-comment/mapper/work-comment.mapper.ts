import { WorkCommentEntity } from '../entities/work-comment.entity';
import { CreateWorkCommentDto } from '../dto/create-work-comment.dto';

export class WorkCommentMapper {
  static toEntity(
    dto: CreateWorkCommentDto,
    authorId: number,
  ): WorkCommentEntity {
    const entity = new WorkCommentEntity();

    entity.workItemId = dto.workItemId;
    entity.parentCommentId = dto.parentCommentId;
    entity.authorId = authorId;
    entity.content = dto.content;
    entity.isEdited = false;

    return entity;
  }

  static updateEntity(
    entity: WorkCommentEntity,
    content: string,
  ): WorkCommentEntity {
    entity.content = content;
    entity.isEdited = true;

    return entity;
  }
}
