// src/features/work/work-comment/listeners/comment-created.listener.ts

import { Injectable, Logger } from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';

import { CommentCreatedEvent } from '../events/comment-created.event';

import { WorkActivityService } from '../../work-activity/services/work-activity.service';

import { WorkActivityAction } from '../../work-activity/enums/work-activity-action.enum';

@Injectable()
export class CommentCreatedListener {
  private readonly logger = new Logger(CommentCreatedListener.name);

  constructor(private readonly workActivityService: WorkActivityService) {}

  @OnEvent('work-comment.created')
  async handle(event: CommentCreatedEvent) {
    this.logger.log(`Comment created: ${event.commentId}`);

    await this.workActivityService.create({
      workItemId: event.workItemId,
      action: WorkActivityAction.COMMENT_ADDED,
      actorId: event.authorId,
      description: 'Comment added',
      newValue: {
        commentId: event.commentId,
        content: event.content,
      },
    });
  }
}
