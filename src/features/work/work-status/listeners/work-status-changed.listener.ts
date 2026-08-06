import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from 'src/features/notification/service/notification.service';
import { WorkStatusChangedEvent } from '../events/work-status-changed.event';
import { NotificationType } from 'src/features/notification/enum/notification-type.enum';

@Injectable()
export class WorkStatusChangedListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('work.status.changed')
  async handle(event: WorkStatusChangedEvent) {
    await this.notificationService.create({
      recipientId: event.userId,
      type: NotificationType.WORK_STATUS_CHANGED,
      title: 'Work status changed',
      message: `Task status changed:
                ${event.oldStatus}
                →
                ${event.newStatus}
                `,
      referenceType: 'WORK_ITEM',
      referenceId: event.workItemId,
    });
  }
}
