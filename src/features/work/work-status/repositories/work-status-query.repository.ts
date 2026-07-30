import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { WorkStatusEntity } from '../entities/work-status.entity';

import { QueryWorkStatusDto } from '../dto/query-work-status.dto';

@Injectable()
export class WorkStatusQueryRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(query: QueryWorkStatusDto) {
    const {
      page = 1,

      limit = 20,

      search,

      isActive,

      category,
    } = query;

    const qb = this.dataSource
      .getRepository(WorkStatusEntity)
      .createQueryBuilder('status');

    qb.where('status.deleted_at IS NULL');

    if (search) {
      qb.andWhere(
        `
 (
 status.code LIKE :search
 OR
 status.name LIKE :search
 )
 `,
        {
          search: `%${search}%`,
        },
      );
    }

    if (isActive !== undefined) {
      qb.andWhere('status.is_active = :isActive', {
        isActive,
      });
    }

    if (category) {
      qb.andWhere('status.category = :category', {
        category,
      });
    }

    qb.orderBy('status.sort_order', 'ASC');

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
