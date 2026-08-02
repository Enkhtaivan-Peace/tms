export class PendingReviewItemDto {
  reviewId!: number;

  workItemId!: number;

  code!: string;

  title!: string;

  step!: string;

  status!: string;

  submittedAt!: Date;
}
