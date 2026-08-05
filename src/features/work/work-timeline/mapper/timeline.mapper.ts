// src/features/work/work-timeline/mapper/timeline.mapper.ts

import { TimelineEventType } from '../dto/timeline-event-type.enum';
import { WorkTimelineResponseDto } from '../dto/work-timeline-response.dto';

export class TimelineMapper {
  static activity(activity: any): WorkTimelineResponseDto {
    return {
      id: activity.id,
      type: activity.action,
      title: activity.action,
      description: activity.description,
      metadata: {
        oldValue: activity.oldValue,
        newValue: activity.newValue,
      },

      createdAt: activity.createdAt,
    };
  }

  static assignment(history: any): WorkTimelineResponseDto {
    return {
      id: history.id,

      type: TimelineEventType.ASSIGNED,

      title: 'Work assignment changed',

      description: `${history.previousUserId ?? '-'} → ${history.newUserId ?? '-'}`,

      metadata: {
        previousUserId: history.previousUserId,
        newUserId: history.newUserId,
        previousTeamId: history.previousTeamId,
        newTeamId: history.newTeamId,
      },

      createdAt: history.createdAt,
    };
  }

  static review(review: any): WorkTimelineResponseDto[] {
    const events: WorkTimelineResponseDto[] = [];

    /**
     * Review started
     */
    events.push({
      id: review.id,

      type: TimelineEventType.REVIEW_STARTED,

      title: 'Review started',

      description: `Review status: ${review.status}`,

      metadata: {
        reviewId: review.id,
        status: review.status,
      },

      createdAt: review.createdAt,
    });

    /**
     * Review steps
     */
    for (const step of review.steps ?? []) {
      events.push({
        id: step.id,

        type: TimelineEventType.REVIEW_STEP_CHANGED,

        title: `Review step: ${step.role}`,

        description: step.status,

        metadata: {
          reviewId: review.id,

          stepId: step.id,

          reviewerId: step.reviewerId,
        },

        createdAt: step.createdAt,
      });
    }

    /**
     * Review decisions
     */
    for (const decision of review.decisions ?? []) {
      let type = TimelineEventType.REVIEW_STEP_CHANGED;

      if (decision.decision === 'APPROVED') {
        type = TimelineEventType.REVIEW_APPROVED;
      }

      if (decision.decision === 'REJECTED') {
        type = TimelineEventType.REVIEW_REJECTED;
      }

      events.push({
        id: decision.id,

        type,

        title: `Review ${decision.decision}`,

        description: decision.comment,

        metadata: {
          reviewId: review.id,

          stepId: decision.stepId,

          decision: decision.decision,
        },

        createdAt: decision.createdAt,
      });
    }

    return events;
  }

  static comment(comment: any): WorkTimelineResponseDto {
    return {
      id: comment.id,

      type: TimelineEventType.COMMENT_CREATED,

      title: `${comment.author?.name ?? 'User'} commented`,

      description: comment.content,

      actor: comment.author
        ? {
            id: comment.author.id,
            name: comment.author.name,
          }
        : undefined,

      metadata: {
        commentId: comment.id,

        parentCommentId: comment.parentCommentId,
      },

      createdAt: comment.createdAt,
    };
  }
}
