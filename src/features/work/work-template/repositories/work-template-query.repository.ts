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

      isActive,
    } = query;

    const qb = this.dataSource
      .getRepository(WorkTemplateEntity)
      .createQueryBuilder('template');

    qb.where('template.deleted_at IS NULL');

    if (search) {
      qb.andWhere(
        `
(
 template.name LIKE :search
 OR
 template.code LIKE :search
)
`,
        {
          search: `%${search}%`,
        },
      );
    }

    if (isActive !== undefined) {
      qb.andWhere('template.is_active=:isActive', {
        isActive,
      });
    }

    qb.leftJoinAndSelect('template.workType', 'workType');

    qb.leftJoinAndSelect('template.initialStatus', 'status');

    qb.orderBy('template.id', 'DESC');

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
