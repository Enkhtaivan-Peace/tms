import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkReviewDecision } from '../entities/work-review-decision.entity';
import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class WorkReviewDecisionRepository extends BaseRepository<WorkReviewDecision> {
  constructor(
    @InjectRepository(WorkReviewDecision)
    repository: Repository<WorkReviewDecision>,
  ) {
    super(repository);
  }

  async findByStepId(stepId: number): Promise<WorkReviewDecision[]> {
    return this.repository.find({
      where: {
        reviewStep: {
          id: stepId,
        },
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findHistory(reviewId: number) {
    return this.repository.find({
      where: {
        reviewStep: {
          review: {
            id: reviewId,
          },
        },
      },

      relations: {
        reviewStep: {
          review: true,
        },
      },

      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findByWorkItem(workItemId: number) {
    return this.repository.find({
      where: {
        reviewStep: {
          review: {
            workItem: {
              id: workItemId,
            },
          },
        },
      },

      relations: {
        reviewStep: {
          review: {
            workItem: true,
          },
        },
      },

      order: {
        createdAt: 'ASC',
      },
    });
  }
}
