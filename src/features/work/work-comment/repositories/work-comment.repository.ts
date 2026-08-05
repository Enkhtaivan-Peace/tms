import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { BaseRepository } from 'src/common/base/base.repository';

import { WorkCommentEntity } from '../entities/work-comment.entity';

@Injectable()
export class WorkCommentRepository extends BaseRepository<WorkCommentEntity> {
  constructor(
    @InjectRepository(WorkCommentEntity)
    repository: Repository<WorkCommentEntity>,
  ) {
    super(repository);
  }

  async findById(id: number): Promise<WorkCommentEntity | null> {
    return this.repository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
      relations: {
        author: true,
        parent: true,
      },
    });
  }

  async findReplies(parentCommentId: number): Promise<WorkCommentEntity[]> {
    return this.repository.find({
      where: {
        parentCommentId,
        deletedAt: IsNull(),
      },
      relations: {
        author: true,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async softDeleteComment(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async restoreComment(id: number): Promise<void> {
    await this.repository.restore(id);
  }
}
