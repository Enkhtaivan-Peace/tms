import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorkReviewStep } from '../entities/work-review-step.entity';
import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class WorkReviewStepRepository extends BaseRepository<WorkReviewStep> {
  constructor(
    @InjectRepository(WorkReviewStep)
    repository: Repository<WorkReviewStep>,
  ) {
    super(repository);
  }

  async findCurrentStep(reviewId: number): Promise<WorkReviewStep | null> {
    return this.repository.findOne({
      where: {
        review: {
          id: reviewId,
        },

        status: 'ACTIVE' as any,
      },
    });
  }

  async findNextStep(
    reviewId: number,

    currentOrder: number,
  ): Promise<WorkReviewStep | null> {
    return this.repository.findOne({
      where: {
        review: {
          id: reviewId,
        },
      },

      order: {
        stepOrder: 'ASC',
      },
    });
  }
}
