import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { WorkTemplateStatusEntity } from '../entities/work-template-status.entity';

import { QueryWorkTemplateStatusDto } from '../dto/query-work-template-status.dto';

@Injectable()
export class WorkTemplateStatusQueryRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(query: QueryWorkTemplateStatusDto) {
    const {
      page = 1,

      limit = 20,

      workTemplateId,

      workStatusId,

      isInitial,

      isActive,
    } = query;

    const qb = this.dataSource
      .getRepository(WorkTemplateStatusEntity)
      .createQueryBuilder('templateStatus');

    qb.leftJoinAndSelect(
      'templateStatus.workStatus',

      'status',
    );

    qb.where('templateStatus.deleted_at IS NULL');

    if (workTemplateId) {
      qb.andWhere('templateStatus.work_template_id = :workTemplateId', {
        workTemplateId,
      });
    }

    if (workStatusId) {
      qb.andWhere('templateStatus.work_status_id = :workStatusId', {
        workStatusId,
      });
    }

    if (isInitial !== undefined) {
      qb.andWhere('templateStatus.is_initial = :isInitial', {
        isInitial,
      });
    }

    if (isActive !== undefined) {
      qb.andWhere('templateStatus.is_active = :isActive', {
        isActive,
      });
    }

    qb.orderBy('templateStatus.sort_order', 'ASC');

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
