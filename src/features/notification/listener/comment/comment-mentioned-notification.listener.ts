import { Injectable } from '@nestjs/common';
import { NotificationService } from '../../service/notification.service';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationType } from '../../enum/notification-type.enum';
import { CommentMentionedNotificationEvent } from '../../events/comment/comment-mentioned-notification.event';

@Injectable()
export class CommentMentionedNotificationListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('notification.comment.mentioned')
  async handle(event: CommentMentionedNotificationEvent) {
    if (event.actorId === event.mentionedUserId) {
      return;
    }

    await this.notificationService.create({
      recipientId: event.mentionedUserId,
      type: NotificationType.COMMENT_MENTIONED,
      title: 'You were mentioned',
      message: 'You were mentioned in a comment.',
      referenceType: 'WORK_COMMENT',
      referenceId: event.commentId,
    });
  }
}
