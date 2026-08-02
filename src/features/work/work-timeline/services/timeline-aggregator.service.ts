import { Injectable } from '@nestjs/common';
import { WorkActivityRepository } from '../../work-activity/repositories/work-activity.repository';
import { WorkItemAssignmentHistoryRepository } from '../../work-item-assignment-history/repositories/work-item-assignment-history.repository';
import { WorkReviewDecisionRepository } from '../../work-review/repositories/work-review-decision.repository';
import { TimelineMapper } from '../mapper/timeline.mapper';

@Injectable()
export class TimelineAggregatorService {
  constructor(
    private readonly activityRepository: WorkActivityRepository,

    private readonly assignmentHistoryRepository: WorkItemAssignmentHistoryRepository,

    private readonly decisionRepository: WorkReviewDecisionRepository,
  ) {}

  async aggregate(workItemId: number) {
    const activities = await this.activityRepository.findByWorkItem(workItemId);

    const assignments =
      await this.assignmentHistoryRepository.findByWorkItem(workItemId);

    const decisions = await this.decisionRepository.findByWorkItem(workItemId);

    return [
      ...activities.map((item) => TimelineMapper.fromActivity(item)),

      ...assignments.map((item) => TimelineMapper.fromAssignment(item)),

      ...decisions.map((item) => TimelineMapper.fromDecision(item)),
    ].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}
