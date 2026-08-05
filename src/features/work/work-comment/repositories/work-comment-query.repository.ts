import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { WorkCommentEntity } from '../entities/work-comment.entity';
import { WorkCommentFilterDto } from '../dto/work-comment-filter.dto';

@Injectable()
export class WorkCommentQueryRepository {
  constructor(
    @InjectRepository(WorkCommentEntity)
    private readonly repository: Repository<WorkCommentEntity>,
  ) {}

  async findAll(filter: WorkCommentFilterDto) {
    const { workItemId, page = 1, limit = 20, search } = filter;

    const qb = this.repository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('comment.replies', 'replies')
      .where('comment.workItemId = :workItemId', {
        workItemId,
      })
      .andWhere('comment.parentCommentId IS NULL')
      .andWhere('comment.deletedAt IS NULL');

    if (search) {
      qb.andWhere('comment.content LIKE :search', {
        search: `%${search}%`,
      });
    }

    qb.orderBy('comment.createdAt', 'ASC');

    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
    };
  }
}
