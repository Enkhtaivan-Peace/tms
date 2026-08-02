import { PendingReviewItemDto } from '../dto/pending-review-item.dto';

export class PendingReviewMapper {
  static toDto(entity: any): PendingReviewItemDto {
    return {
      reviewId: entity.review.id,

      workItemId: entity.review.workItem.id,

      code: entity.review.workItem.code,

      title: entity.review.workItem.title,

      step: entity.reviewType,

      status: entity.status,

      submittedAt: entity.review.submittedAt,
    };
  }
}
