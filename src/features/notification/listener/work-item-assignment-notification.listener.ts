import { Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';

import { NotificationService } from '../service/notification.service';

import { NotificationType } from '../enum/notification-type.enum';
import { WorkItemAssignmentCreatedEvent } from 'src/features/work/events/work-item-assignment-created.event';
import { WorkItemAssignmentRoleChangedEvent } from 'src/features/work/events/work-item-assignment-role-changed.event';
import { WorkItemAssignmentRemovedEvent } from 'src/features/work/events/work-item-assignment-removed.event';

@Injectable()
export class WorkItemAssignmentNotificationListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('work-item.assignment.created')
  async assigned(event: WorkItemAssignmentCreatedEvent) {
    const userId = event.assignment.userId;

    if (!userId) {
      return;
    }

    await this.notificationService.create({
      receiverId: userId,
      type: NotificationType.WORK_ITEM_ASSIGNED,
      title: 'New Work Item Assignment',
      message: 'You have been assigned to a work item',
      payload: {
        workItemId: event.assignment.workItemId,
        role: event.assignment.role,
      },
    });
  }

  @OnEvent('work-item.assignment.role.changed')
  async roleChanged(event: WorkItemAssignmentRoleChangedEvent) {
    // assignment -> user lookup хийх боломжтой
  }

  @OnEvent('work-item.assignment.removed')
  async removed(event: WorkItemAssignmentRemovedEvent) {
    // notify removed user
  }
}
