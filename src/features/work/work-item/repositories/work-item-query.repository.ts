import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { WorkItemEntity } from '../entities/work-item.entity';

import { QueryWorkItemDto } from '../dto/query-work-item.dto';

@Injectable()
export class WorkItemQueryRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(query: QueryWorkItemDto) {
    const {
      page = 1,

      limit = 20,

      search,

      workTemplateId,

      statusId,

      priority,

      createdBy,
    } = query;

    const qb = this.dataSource
      .getRepository(WorkItemEntity)
      .createQueryBuilder('work');

    /**
     * Soft delete filter
     */
    qb.where('work.deleted_at IS NULL');

    /**
     * Search
     */
    if (search) {
      qb.andWhere(
        `
        (
          work.code LIKE :search

          OR

          work.title LIKE :search

          OR

          work.description LIKE :search
        )
        `,

        {
          search: `%${search}%`,
        },
      );
    }

    /**
     * Template filter
     */
    if (workTemplateId) {
      qb.andWhere(
        'work.work_template_id = :workTemplateId',

        {
          workTemplateId,
        },
      );
    }

    /**
     * Status filter
     */
    if (statusId) {
      qb.andWhere(
        'work.status_id = :statusId',

        {
          statusId,
        },
      );
    }

    /**
     * Priority filter
     */
    if (priority) {
      qb.andWhere(
        'work.priority = :priority',

        {
          priority,
        },
      );
    }

    /**
     * Created user
     */
    if (createdBy) {
      qb.andWhere(
        'work.created_by = :createdBy',

        {
          createdBy,
        },
      );
    }

    /**
     * Relations
     */
    qb.leftJoinAndSelect(
      'work.workTemplate',

      'template',
    );

    qb.leftJoinAndSelect(
      'work.status',

      'status',
    );

    /**
     * Sorting
     */
    qb.orderBy(
      'work.created_at',

      'DESC',
    );

    /**
     * Pagination
     */
    qb.skip((page - 1) * limit);

    qb.take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,

      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),
    };
  }
}
