import { Injectable } from '@nestjs/common';
import { NotificationService } from '../../service/notification.service';
import { NotificationRoutingService } from '../../service/notification-routing.service';
import { OnEvent } from '@nestjs/event-emitter';
import { WorkCommentUpdatedNotificationEvent } from '../../events/comment/comment-updated-notification.event';
import { NotificationType } from '../../enum/notification-type.enum';

@Injectable()
export class CommentUpdatedNotificationListener {
  constructor(
    private readonly notificationService: NotificationService,

    private readonly routingService: NotificationRoutingService,
  ) {}

  @OnEvent('notification.comment.updated')
  async handle(event: WorkCommentUpdatedNotificationEvent) {
    const recipients = await this.routingService.commentUpdated(
      event.workItemId,
      event.actorId,
    );

    for (const recipientId of recipients) {
      await this.notificationService.create({
        recipientId,
        type: NotificationType.COMMENT_UPDATED,
        title: 'Comment updated',
        message: 'A comment was updated on your work item.',
        referenceType: 'WORK_COMMENT',
        referenceId: event.commentId,
      });
    }
  }
}
