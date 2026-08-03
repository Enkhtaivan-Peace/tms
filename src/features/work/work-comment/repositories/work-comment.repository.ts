import { Injectable } from '@nestjs/common';

import { IsNull, Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { WorkCommentEntity } from '../entities/work-comment.entity';
import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class WorkCommentRepository extends BaseRepository<WorkCommentEntity> {
  constructor(
    @InjectRepository(WorkCommentEntity)
    repo: Repository<WorkCommentEntity>,
  ) {
    super(repo);
  }

  async findByWorkItem(workItemId: number) {
    return this.findAll({
      where: {
        workItemId,
        deletedAt: IsNull(),
      },

      relations: { replies: true },
    });
  }
}
