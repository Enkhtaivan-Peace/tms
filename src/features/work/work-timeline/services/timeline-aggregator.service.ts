import { Injectable } from '@nestjs/common';
import { WorkActivityRepository } from '../../work-activity/repositories/work-activity.repository';
import { WorkReviewRepository } from '../../work-review/repositories/work-review.repository';
import { WorkCommentRepository } from '../../work-comment/repositories/work-comment.repository';
import { TimelineMapper } from '../mapper/timeline.mapper';
import { WorkItemAssignmentHistoryRepository } from '../../work-item-assignment-history/repositories/work-item-assignment-history.repository';

@Injectable()
export class TimelineAggregatorService {
  constructor(
    private readonly activityRepository: WorkActivityRepository,
    private readonly assignmentHistoryRepository: WorkItemAssignmentHistoryRepository,
    private readonly reviewRepository: WorkReviewRepository,
    private readonly commentRepository: WorkCommentRepository,
  ) {}

  async aggregate(workItemId: number) {
    const [activities, assignments, reviews, comments] = await Promise.all([
      this.activityRepository.findByWorkItem(workItemId),

      this.assignmentHistoryRepository.findByWorkItem(workItemId),

      this.reviewRepository.findByWorkItemId(workItemId),

      this.commentRepository.findByWorkItem(workItemId),
    ]);

    return [
      ...activities.map(TimelineMapper.activity),

      ...assignments.map(TimelineMapper.assignment),

      ...(reviews ? TimelineMapper.review(reviews) : []),

      ...comments.map(TimelineMapper.comment),
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
