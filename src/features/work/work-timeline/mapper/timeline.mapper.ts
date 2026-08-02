import { TimelineItemDto } from '../dto/timeline-item.dto';
import { TimelineType } from '../enums/timeline-type.enum';

import { WorkActivityEntity } from '../../work-activity/entities/work-activity.entity';
import { WorkItemAssignmentHistoryEntity } from '../../work-item-assignment-history/entities/work-item-assignment-history.entity';
import { WorkReviewDecision } from '../../work-review/entities/work-review-decision.entity';
import { AssignmentHistoryAction } from '../../work-item-assignment-history/enum/work-item-assignment-action.enum';

export class TimelineMapper {
  private static resolveAssignmentTitle(
    action: AssignmentHistoryAction,
  ): string {
    switch (action) {
      case AssignmentHistoryAction.ASSIGNED:
        return 'Work item assigned';

      case AssignmentHistoryAction.REASSIGNED:
        return 'Work item reassigned';

      case AssignmentHistoryAction.ROLE_CHANGED:
        return 'Assignment role changed';

      case AssignmentHistoryAction.REMOVED:
        return 'Assignment removed';

      default:
        return 'Assignment changed';
    }
  }
  /**
   * WorkActivity -> Timeline
   */
  static fromActivity(activity: WorkActivityEntity): TimelineItemDto {
    return {
      type: this.resolveActivityType(activity.action),

      title: this.resolveActivityTitle(activity.action),

      actorId: activity.actorId,

      metadata: {
        action: activity.action,

        oldValue: activity.oldValue,

        newValue: activity.newValue,
      },

      createdAt: activity.createdAt,
    };
  }

  /**
   * Assignment History -> Timeline
   */
  static fromAssignment(
    history: WorkItemAssignmentHistoryEntity,
  ): TimelineItemDto {
    return {
      type: TimelineType.ASSIGNED,

      title: this.resolveAssignmentTitle(history.action),

      actorId: history.changedBy,

      metadata: {
        assignmentId: history.assignmentId,

        action: history.action,

        oldRole: history.oldRole,

        newRole: history.newRole,

        oldUserId: history.oldUserId,

        newUserId: history.newUserId,

        oldTeamId: history.oldTeamId,

        newTeamId: history.newTeamId,
      },

      createdAt: history.createdAt,
    };
  }

  /**
   * Review Decision -> Timeline
   */
  static fromDecision(decision: WorkReviewDecision): TimelineItemDto {
    return {
      type: this.resolveDecisionType(decision.decision),

      title: this.resolveDecisionTitle(decision.decision),

      actorId: decision.decidedBy,

      metadata: {
        reviewStepId: decision.reviewStep.id,
        comment: decision.comment,
        decision: decision.decision,
      },

      createdAt: decision.createdAt,
    };
  }

  private static resolveActivityType(action: string): TimelineType {
    switch (action) {
      case 'STATUS_CHANGED':
        return TimelineType.STATUS_CHANGED;

      default:
        return TimelineType.CREATED;
    }
  }

  private static resolveActivityTitle(action: string): string {
    switch (action) {
      case 'STATUS_CHANGED':
        return 'Work status changed';

      case 'CREATED':
        return 'Work item created';

      default:
        return action;
    }
  }

  private static resolveDecisionType(decision: string): TimelineType {
    switch (decision) {
      case 'APPROVE':
        return TimelineType.REVIEW_APPROVED;

      case 'REJECT':
      case 'REQUEST_CHANGES':
        return TimelineType.REVIEW_REJECTED;

      default:
        return TimelineType.REVIEW_APPROVED;
    }
  }

  private static resolveDecisionTitle(decision: string): string {
    switch (decision) {
      case 'APPROVE':
        return 'Review approved';

      case 'REJECT':
        return 'Review rejected';

      case 'REQUEST_CHANGES':
        return 'Changes requested';

      default:
        return 'Review decision';
    }
  }
}
