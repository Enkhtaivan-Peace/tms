import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../../service/notification.service';
import { WorkCommentCreatedNotificationEvent } from '../../events/comment/comment-created-notification.event';
import { NotificationType } from '../../enum/notification-type.enum';
import { NotificationRoutingService } from '../../service/notification-routing.service';
import { NotificationEventType } from '../../enum/notification-event-type.enum';

@Injectable()
export class CommentCreatedNotificationListener {
  constructor(
    private readonly notificationService: NotificationService,

    private readonly routingService: NotificationRoutingService,
  ) {}

  @OnEvent(NotificationEventType.COMMENT_CREATED)
  async handle(event: WorkCommentCreatedNotificationEvent) {
    const recipients = await this.routingService.commentCreated(
      event.workItemId,
      event.authorId,
    );

    for (const recipientId of recipients) {
      await this.notificationService.create({
        recipientId,
        type: NotificationType.COMMENT_ADDED,
        title: 'New comment',
        message: 'A new comment was added to your work item.',
        referenceType: 'WORK_COMMENT',
        referenceId: event.commentId,
      });
    }
  }
}
