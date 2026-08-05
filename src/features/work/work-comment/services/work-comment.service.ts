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

@Injectable()
export class WorkCommentService {
  constructor(
    private readonly workCommentRepository: WorkCommentRepository,

    private readonly workItemRepository: WorkItemRepository,
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

    return this.workCommentRepository.create(entity);
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

    WorkCommentMapper.updateEntity(comment, dto.content);

    return this.workCommentRepository.update(id, {
      content: comment.content,
    });
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
