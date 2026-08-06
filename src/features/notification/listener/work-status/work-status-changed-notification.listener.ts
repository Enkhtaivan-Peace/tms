import { Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';

import { WorkStatusChangedNotificationEvent } from '../../events/work-status/work-status-changed-notification.event';
import { NotificationService } from '../../service/notification.service';
import { NotificationType } from '../../enum/notification-type.enum';
import { NotificationPriority } from '../../enum/notification-priority.enum';

@Injectable()
export class WorkStatusChangedNotificationListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('notification.work.status.changed')
  async handle(event: WorkStatusChangedNotificationEvent) {
    await this.notificationService.create({
      recipientId: event.assignedUserId,
      type: NotificationType.WORK_STATUS_CHANGED,
      priority: NotificationPriority.NORMAL,
      title: 'Work status changed',
      message: `
        Work status changed:
        ${event.previousStatus}
        →
        ${event.newStatus}
        `,

      referenceType: 'WORK_ITEM',

      referenceId: event.workItemId,
    });
  }
}
