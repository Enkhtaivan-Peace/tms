import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { WorkReviewService } from '../services/work-review.service';
import { SubmitReviewDto } from '../dto/submit-review.dto';
import { ReviewActionDto } from '../dto/review-action.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('work-reviews')
export class WorkReviewController {
  constructor(private readonly workReviewService: WorkReviewService) {}

  // Employee submit
  @Post('work-items/:workItemId/submit')
  async submit(
    @Param('workItemId', ParseIntPipe)
    workItemId: number,

    @Body()
    dto: SubmitReviewDto,
    @CurrentUser('sub') userId: number,
  ) {
    // TO-DO:
    // AuthGuard-аас авна
    return this.workReviewService.submit(workItemId, userId, dto);
  }

  @Post(':reviewId/resubmit')
  async resubmit(
    @Param('reviewId')
    reviewId: number,

    @CurrentUser('sub')
    userId: number,

    @Body()
    dto: SubmitReviewDto,
  ) {
    return this.workReviewService.resubmit(reviewId, userId, dto);
  }

  // Approve
  @Post(':reviewId/approve')
  async approve(
    @Param('reviewId', ParseIntPipe)
    reviewId: number,
    @Body()
    dto: ReviewActionDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.workReviewService.approve(reviewId, userId, dto);
  }

  // Reject

  @Post(':reviewId/reject')
  async reject(
    @Param('reviewId', ParseIntPipe)
    reviewId: number,
    @Body()
    dto: ReviewActionDto,
    @CurrentUser('sub') userId: number,
  ) {
    return this.workReviewService.reject(reviewId, userId, dto);
  }
}
