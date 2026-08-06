import { Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';

import { WorkAssignedNotificationEvent } from '../../events/assignment/work-assigned-notification.event';
import { NotificationService } from '../../service/notification.service';
import { NotificationType } from '../../enum/notification-type.enum';
import { NotificationPriority } from '../../enum/notification-priority.enum';

@Injectable()
export class WorkAssignedNotificationListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('notification.work.assigned')
  async handle(event: WorkAssignedNotificationEvent) {
    await this.notificationService.create({
      recipientId: event.assignedUserId,
      type: NotificationType.WORK_ASSIGNED,
      priority: NotificationPriority.HIGH,
      title: 'New work assigned',
      message: 'A new task has been assigned to you',
      referenceType: 'WORK_ITEM',
      referenceId: event.workItemId,
    });
  }
}
