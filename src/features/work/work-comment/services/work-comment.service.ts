import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { WorkCommentRepository } from '../repositories/work-comment.repository';

import { CreateWorkCommentDto } from '../dto/create-work-comment.dto';
import { UpdateWorkCommentDto } from '../dto/update-work-comment.dto';

import { WorkCommentMapper } from '../mapper/work-comment.mapper';

import { WorkItemRepository } from '../../work-item/repositories/work-item.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CommentCreatedActivityEvent } from '../events/comment-created-activity.event';

import { CommentUpdatedActivityEvent } from '../events/comment-updated-activity.event';

import { CommentDeletedActivityEvent } from '../events/comment-deleted-activity.event';
import { WorkCommentCreatedNotificationEvent } from 'src/features/notification/events/comment/comment-created-notification.event';
import { WorkCommentUpdatedNotificationEvent } from 'src/features/notification/events/comment/comment-updated-notification.event';
import { NotificationEventType } from 'src/features/notification/enum/notification-event-type.enum';

@Injectable()
export class WorkCommentService {
  constructor(
    private readonly workCommentRepository: WorkCommentRepository,

    private readonly workItemRepository: WorkItemRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  /**
   * Create Comment
   */
  async create(dto: CreateWorkCommentDto, userId: number) {
    const workItem = await this.workItemRepository.findById(dto.workItemId);

    if (!workItem) {
      throw new NotFoundException('Work item not found');
    }

    if (dto.parentCommentId) {
      const parent = await this.workCommentRepository.findById(
        dto.parentCommentId,
      );

      if (!parent) {
        throw new NotFoundException('Parent comment not found');
      }
    }

    const entity = WorkCommentMapper.toEntity(dto, userId);

    const comment = await this.workCommentRepository.create(entity);

    this.eventEmitter.emit(
      'work-comment.created',
      new CommentCreatedActivityEvent(
        comment.id,
        dto.workItemId,
        userId,
        comment.content,
      ),
    );

    this.eventEmitter.emit(
      NotificationEventType.COMMENT_CREATED,
      new WorkCommentCreatedNotificationEvent(
        comment.workItemId,
        comment.id,
        comment.authorId,
        userId,
      ),
    );

    return comment;
  }

  /**
   * Update Comment
   */
  async update(id: number, dto: UpdateWorkCommentDto, userId: number) {
    const comment = await this.workCommentRepository.findById(id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You cannot edit this comment');
    }

    const oldContent = comment.content;

    WorkCommentMapper.updateEntity(comment, dto.content);

    const updated = await this.workCommentRepository.update(id, {
      content: comment.content,
    });

    this.eventEmitter.emit(
      'work-comment.updated',
      new CommentUpdatedActivityEvent(
        comment.id,
        comment.workItemId,
        userId,
        oldContent,
        comment.content,
      ),
    );

    this.eventEmitter.emit(
      'work-comment-created-notification',
      new WorkCommentUpdatedNotificationEvent(
        comment.workItemId,
        comment.id,
        comment.authorId,
        userId,
      ),
    );

    return updated;
  }

  /**
   * Delete Comment
   */
  async remove(id: number, userId: number) {
    const comment = await this.workCommentRepository.findById(id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You cannot delete this comment');
    }

    await this.workCommentRepository.softDeleteComment(id);

    this.eventEmitter.emit(
      'work-comment.deleted',

      new CommentDeletedActivityEvent(
        comment.id,

        comment.workItemId,

        userId,

        comment.content,
      ),
    );
    return {
      success: true,
    };
  }

  /**
   * Get single comment
   */
  async findById(id: number) {
    const comment = await this.workCommentRepository.findById(id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  /**
   * Get thread
   */
  async getThread(id: number) {
    const comment = await this.findById(id);

    const replies = await this.workCommentRepository.findReplies(id);

    return {
      comment,
      replies,
    };
  }
}
