import { Injectable, Logger } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';

import { CommentDeletedEvent } from '../events/comment-deleted.event';

import { WorkActivityService } from '../../work-activity/services/work-activity.service';

import { WorkActivityAction } from '../../work-activity/enums/work-activity-action.enum';

@Injectable()
export class CommentDeletedListener {
  private readonly logger = new Logger(CommentDeletedListener.name);

  constructor(private readonly workActivityService: WorkActivityService) {}

  @OnEvent('work-comment.deleted')
  async handle(event: CommentDeletedEvent) {
    this.logger.log(`Comment deleted: ${event.commentId}`);

    await this.workActivityService.create({
      workItemId: event.workItemId,
      action: WorkActivityAction.COMMENT_DELETED,
      actorId: event.authorId,
      description: 'Comment deleted',

      oldValue: {
        commentId: event.commentId,
        content: event.content,
      },
    });
  }
}
