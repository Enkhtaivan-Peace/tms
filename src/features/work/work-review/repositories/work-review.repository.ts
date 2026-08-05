import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { WorkReview } from '../entities/work-review.entity';
import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class WorkReviewRepository extends BaseRepository<WorkReview> {
  constructor(
    @InjectRepository(WorkReview)
    repository: Repository<WorkReview>,
  ) {
    super(repository);
  }

  async findByWorkItemId(workItemId: number): Promise<WorkReview | null> {
    return this.repository.findOne({
      where: {
        workItem: {
          id: workItemId,
        },
        deletedAt: IsNull(),
      },
      relations: {
        steps: true,
        decisions: true,
      },
    });
  }

  async findActiveReview(workItemId: number): Promise<WorkReview | null> {
    return this.repository.findOne({
      where: {
        workItem: {
          id: workItemId,
        },

        status: 'IN_PROGRESS' as any,
      },

      relations: {
        steps: true,
      },
    });
  }
}
