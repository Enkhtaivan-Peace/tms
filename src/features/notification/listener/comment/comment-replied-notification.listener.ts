import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationType } from '../../enum/notification-type.enum';
import { CommentRepliedNotificationEvent } from '../../events/comment/comment-replied-notification.event';
import { NotificationService } from '../../service/notification.service';

@Injectable()
export class CommentRepliedNotificationListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('notification.comment.replied')
  async handle(event: CommentRepliedNotificationEvent) {
    if (event.parentAuthorId === event.actorId) {
      return;
    }

    await this.notificationService.create({
      recipientId: event.parentAuthorId,
      type: NotificationType.COMMENT_REPLIED,
      title: 'New reply',
      message: 'Someone replied to your comment.',
      referenceType: 'WORK_COMMENT',
      referenceId: event.commentId,
    });
  }
}
