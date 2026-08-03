import { Injectable } from '@nestjs/common';

import { WorkCommentRepository } from '../repositories/work-comment.repository';

import { CreateWorkCommentDto } from '../dto/create-work-comment.dto';

@Injectable()
export class WorkCommentService {
  constructor(private readonly repository: WorkCommentRepository) {}

  async create(dto: CreateWorkCommentDto, userId: number) {
    const comment = this.repository.create({
      ...dto,

      createdBy: userId,
    });

    return this.repository.create({
      ...dto,
      createdBy: userId,
    });
  }

  async findByWorkItem(workItemId: number) {
    return this.repository.findByWorkItem(workItemId);
  }

  async update(id: number, content: string, userId: number) {
    return this.repository.update(id, {
      content,
      updatedBy: userId,
      isEdited: true,
    });
  }

  async remove(id: number) {
    return this.repository.softDelete(id);
  }
}
