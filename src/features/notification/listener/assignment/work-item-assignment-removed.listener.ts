import { Injectable, Logger } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';

import { WorkItemAssignmentRemovedEvent } from '../../events/assignment/work-item-assignment-removed-notification.event';
import { NotificationPriority } from '../../enum/notification-priority.enum';
import { NotificationType } from '../../enum/notification-type.enum';
import { NotificationService } from '../../service/notification.service';

@Injectable()
export class WorkItemAssignmentRemovedListener {
  private readonly logger = new Logger(WorkItemAssignmentRemovedListener.name);

  constructor(private readonly notificationService: NotificationService) {}

  /**
   * Assignment removed notification
   */
  @OnEvent('notification.work.assignment.removed')
  async handle(event: WorkItemAssignmentRemovedEvent) {
    this.logger.log(
      `Assignment removed notification: workItem=${event.workItemId}, user=${event.userId}`,
    );

    /**
     * Team assignment бол userId байхгүй байж болно
     */
    if (!event.userId) {
      return;
    }

    await this.notificationService.create({
      /**
       * Notification receiver
       */
      recipientId: event.userId,

      /**
       * Notification type
       */
      type: NotificationType.WORK_ASSIGNMENT_REMOVED,

      priority: NotificationPriority.HIGH,

      title: 'Work assignment removed',

      message: `
        You have been removed from work item.
        Previous role: ${event.role}
        `,

      referenceType: 'WORK_ITEM',

      referenceId: event.workItemId,
    });
  }
}
