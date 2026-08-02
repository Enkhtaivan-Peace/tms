import { Injectable } from '@nestjs/common';

import { WorkActivityRepository } from '../repositories/work-activity.repository';

import { WorkTimelineItemDto } from '../dto/work-timeline-item.dto';
import { WorkActivityAction } from '../enums/work-activity-action.enum';

@Injectable()
export class WorkTimelineQueryService {
  constructor(private readonly repository: WorkActivityRepository) {}

  async findByWorkItem(workItemId: number): Promise<WorkTimelineItemDto[]> {
    const activities = await this.repository.findAll({
      where: {
        workItemId,
      },
    });

    return activities.map((activity) => ({
      id: activity.id,
      type: activity.action,
      message: this.buildMessage(activity),
      actorId: activity.actorId,
      data: {
        oldValue: activity.oldValue,
        newValue: activity.newValue,
      },
      createdAt: activity.createdAt,
    }));
  }

  private buildMessage(activity: any) {
    switch (activity.action) {
      case WorkActivityAction.STATUS_CHANGED:
        return 'Work status changed';

      case WorkActivityAction.ASSIGNED:
        return 'Work item assigned';

      case WorkActivityAction.COMMENT_ADDED:
        return 'Comment added';

      default:
        return activity.action;
    }
  }
}
