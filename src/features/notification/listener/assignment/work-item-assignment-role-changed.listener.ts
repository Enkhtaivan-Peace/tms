import { Injectable } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../../service/notification.service';
import { WorkItemAssignmentRoleChangedEvent } from '../../events/assignment/work-item-assignment-role-changed-notification.event';
import { NotificationType } from '../../enum/notification-type.enum';

@Injectable()
export class WorkItemAssignmentRoleChangedListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('notification.work.assignment.role.changed')
  async handle(event: WorkItemAssignmentRoleChangedEvent) {
    await this.notificationService.create({
      recipientId: event.userId,
      type: NotificationType.WORK_ASSIGNMENT_ROLE_CHANGED,
      title: 'Assignment role changed',
      message: `
            Your role changed:
            ${event.oldRole}
            → 
            ${event.newRole}
            `,
      referenceType: 'WORK_ITEM',
      referenceId: event.workItemId,
    });
  }
}
