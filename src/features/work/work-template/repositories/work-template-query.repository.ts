import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { WorkTemplateEntity } from '../entities/work-template.entity';

import { QueryWorkTemplateDto } from '../dto/query-work-template.dto';

@Injectable()
export class WorkTemplateQueryRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(query: QueryWorkTemplateDto) {
    const {
      page = 1,
      limit = 20,
      search,
      workTypeId,
      workCategoryId,
      defaultPriority,
      isDefault,
      isActive,
    } = query;

    const qb = this.dataSource
      .getRepository(WorkTemplateEntity)
      .createQueryBuilder('template')

      .leftJoinAndSelect('template.workType', 'workType')

      .leftJoinAndSelect('template.workCategory', 'workCategory');

    qb.where('template.deleted_at IS NULL');

    if (search) {
      qb.andWhere(
        `
        (
          template.code LIKE :search
          OR template.name LIKE :search
        )
        `,
        {
          search: `%${search}%`,
        },
      );
    }

    if (workTypeId) {
      qb.andWhere('template.work_type_id = :workTypeId', {
        workTypeId,
      });
    }

    if (workCategoryId) {
      qb.andWhere('template.work_category_id = :workCategoryId', {
        workCategoryId,
      });
    }

    if (defaultPriority) {
      qb.andWhere('template.default_priority = :defaultPriority', {
        defaultPriority,
      });
    }

    if (isDefault !== undefined) {
      qb.andWhere('template.is_default = :isDefault', {
        isDefault,
      });
    }

    if (isActive !== undefined) {
      qb.andWhere('template.is_active = :isActive', {
        isActive,
      });
    }

    qb.orderBy('template.sort_order', 'ASC');

    qb.addOrderBy('template.id', 'ASC');

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
