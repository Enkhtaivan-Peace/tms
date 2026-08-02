import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorkReviewStep } from '../entities/work-review-step.entity';
import { BaseRepository } from 'src/common/base/base.repository';
import { ReviewStepStatus } from '../enums/review-step-status.enum';

@Injectable()
export class WorkReviewStepRepository extends BaseRepository<WorkReviewStep> {
  constructor(
    @InjectRepository(WorkReviewStep)
    repository: Repository<WorkReviewStep>,
  ) {
    super(repository);
  }

  async findCurrentStep(reviewId: number) {
    return this.repository.findOne({
      where: {
        review: {
          id: reviewId,
        },
        status: ReviewStepStatus.ACTIVE,
      },
      relations: {
        review: true,
      },
    });
  }

  async findNextStep(
    reviewId: number,

    currentOrder: number,
  ) {
    return this.repository.findOne({
      where: {
        review: {
          id: reviewId,
        },

        stepOrder: currentOrder + 1,
      },

      order: {
        stepOrder: 'ASC',
      },
    });
  }

  /**
   * First review step
   *
   * Used by resubmit flow
   */
  async findFirstStep(reviewId: number) {
    return this.repository.findOne({
      where: {
        review: {
          id: reviewId,
        },

        stepOrder: 1,
      },
    });
  }
}
