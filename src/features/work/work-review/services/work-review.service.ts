import { Injectable } from '@nestjs/common';

import { SubmitReviewDto } from '../dto/submit-review.dto';

import { ReviewActionDto } from '../dto/review-action.dto';
import { ReviewEngineService } from './review-engine.service';

@Injectable()
export class WorkReviewService {
  constructor(private readonly reviewEngine: ReviewEngineService) {}

  async submit(
    workItemId: number,

    userId: number,

    dto: SubmitReviewDto,
  ) {
    return this.reviewEngine.startReview({
      workItemId,

      userId,

      comment: dto.comment,
    });
  }
  async resubmit(
    reviewId: number,

    userId: number,

    dto: SubmitReviewDto,
  ) {
    return this.reviewEngine.resubmit({
      reviewId,

      userId,

      comment: dto.comment,
    });
  }

  async approve(
    reviewId: number,

    userId: number,

    dto: ReviewActionDto,
  ) {
    return this.reviewEngine.approve({
      reviewId,

      userId,

      comment: dto.comment,
    });
  }

  async reject(
    reviewId: number,

    userId: number,

    dto: ReviewActionDto,
  ) {
    return this.reviewEngine.reject({
      reviewId,

      userId,

      comment: dto.comment,
    });
  }
}
