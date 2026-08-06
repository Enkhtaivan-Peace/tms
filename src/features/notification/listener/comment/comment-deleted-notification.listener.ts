import { Injectable } from '@nestjs/common';
import { NotificationService } from '../../service/notification.service';
import { NotificationRoutingService } from '../../service/notification-routing.service';
import { CommentDeletedNotificationEvent } from '../../events/comment/comment-deleted-notification.event';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationType } from '../../enum/notification-type.enum';

@Injectable()
export class CommentDeletedNotificationListener {
  constructor(
    private readonly notificationService: NotificationService,

    private readonly routingService: NotificationRoutingService,
  ) {}

  @OnEvent('notification.comment.deleted')
  async handle(event: CommentDeletedNotificationEvent) {
    const recipients = await this.routingService.commentCreated(
      event.workItemId,
      event.actorId,
    );

    for (const recipientId of recipients) {
      await this.notificationService.create({
        recipientId,
        type: NotificationType.COMMENT_DELETED,
        title: 'Comment deleted',
        message: 'A comment was deleted from your work item.',
        referenceType: 'WORK_COMMENT',
        referenceId: event.commentId,
      });
    }
  }
}
