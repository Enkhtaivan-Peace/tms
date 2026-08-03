import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from '../../notification/service/notification.service';
import { NotificationType } from '../../notification/enum/notification-type.enum';

@Injectable()
export class CommentMentionListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('COMMENT_MENTIONED')
  async handle(event: any) {
    for (const user of event.users) {
      await this.notificationService.create({
        receiverId: user,
        type: NotificationType.WORK_COMMENT_MENTION,
        title: 'You were mentioned in a comment',
        message: 'You were mentioned in a comment',
      });
    }
  }
}
