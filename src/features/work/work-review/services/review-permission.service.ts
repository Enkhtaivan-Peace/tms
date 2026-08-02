import { Injectable, ForbiddenException } from '@nestjs/common';

import { WorkReviewStep } from '../entities/work-review-step.entity';
import { ReviewStepStatus } from '../enums/review-step-status.enum';

@Injectable()
export class ReviewPermissionService {
  /**
   * Validate reviewer permission
   */
  canReview(step: WorkReviewStep, userId: number) {
    if (step.reviewerId !== userId) {
      throw new ForbiddenException('You are not assigned as reviewer');
    }

    return true;
  }

  /**
   * Validate step status
   */
  canApprove(step: WorkReviewStep) {
    if (step.status !== ReviewStepStatus.ACTIVE) {
      throw new ForbiddenException('Review step is not active');
    }

    return true;
  }

  canReject(step: WorkReviewStep) {
    if (step.status !== ReviewStepStatus.ACTIVE) {
      throw new ForbiddenException('Review step is not active');
    }

    return true;
  }
}
