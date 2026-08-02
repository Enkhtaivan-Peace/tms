import { ReviewHistoryItemDto } from '../dto/review-history-item.dto';

export class WorkReviewHistoryMapper {
  static toDto(entity: any): ReviewHistoryItemDto {
    return {
      step: entity.reviewStep.reviewType,
      decision: entity.decision,
      reviewerId: entity.reviewStep.reviewerId,
      decidedBy: entity.decidedBy,
      comment: entity.comment,
      createdAt: entity.createdAt,
    };
  }
}
