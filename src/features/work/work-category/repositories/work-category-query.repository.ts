import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { WorkCategoryEntity } from '../entities/work-category.entity';

import { QueryWorkCategoryDto } from '../dto/query-work-category.dto';

@Injectable()
export class WorkCategoryQueryRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(query: QueryWorkCategoryDto) {
    const { page = 1, limit = 20, search, isActive } = query;

    const qb = this.dataSource
      .getRepository(WorkCategoryEntity)
      .createQueryBuilder('category');

    qb.where('category.deleted_at IS NULL');

    if (search) {
      qb.andWhere(
        `
 (
 category.name LIKE :search
 OR
 category.code LIKE :search
 )
 `,
        {
          search: `%${search}%`,
        },
      );
    }

    if (isActive !== undefined) {
      qb.andWhere('category.is_active = :isActive', {
        isActive,
      });
    }

    qb.orderBy('category.sort_order', 'ASC');

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
