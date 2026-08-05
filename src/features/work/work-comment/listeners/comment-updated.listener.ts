import { Injectable, Logger } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';

import { CommentUpdatedEvent } from '../events/comment-updated.event';

import { WorkActivityService } from '../../work-activity/services/work-activity.service';

import { WorkActivityAction } from '../../work-activity/enums/work-activity-action.enum';

@Injectable()
export class CommentUpdatedListener {
  private readonly logger = new Logger(CommentUpdatedListener.name);

  constructor(private readonly workActivityService: WorkActivityService) {}

  @OnEvent('work-comment.updated')
  async handle(event: CommentUpdatedEvent) {
    this.logger.log(`Comment updated: ${event.commentId}`);

    await this.workActivityService.create({
      workItemId: event.workItemId,
      action: WorkActivityAction.COMMENT_UPDATED,
      actorId: event.authorId,
      description: 'Comment updated',
      oldValue: {
        commentId: event.commentId,
        content: event.oldContent,
      },
      newValue: {
        commentId: event.commentId,
        content: event.newContent,
      },
    });
  }
}
