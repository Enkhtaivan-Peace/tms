import { ReviewDecision } from '../enums/review-decision.enum';

import { ReviewType } from '../enums/review-type.enum';

export class ReviewHistoryItemDto {
  step!: ReviewType;
  decision!: ReviewDecision;
  reviewerId!: number;
  decidedBy!: number;
  comment?: string;
  createdAt!: Date;
}
