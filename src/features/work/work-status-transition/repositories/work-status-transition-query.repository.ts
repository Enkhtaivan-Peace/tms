import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { WorkStatusTransitionEntity } from '../entities/work-status-transition.entity';

import { QueryWorkStatusTransitionDto } from '../dto/query-work-status-transition.dto';

@Injectable()
export class WorkStatusTransitionQueryRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(query: QueryWorkStatusTransitionDto) {
    const {
      page = 1,

      limit = 20,

      search,

      fromStatusId,

      toStatusId,

      isActive,
    } = query;

    const qb = this.dataSource
      .getRepository(WorkStatusTransitionEntity)
      .createQueryBuilder('transition')

      .leftJoinAndSelect('transition.fromStatus', 'fromStatus')

      .leftJoinAndSelect('transition.toStatus', 'toStatus')

      .where('transition.deleted_at IS NULL');

    if (search) {
      qb.andWhere(
        `
 (
 transition.code LIKE :search
 OR transition.name LIKE :search
 )
 `,
        {
          search: `%${search}%`,
        },
      );
    }

    if (fromStatusId) {
      qb.andWhere('transition.from_status_id=:fromStatusId', {
        fromStatusId,
      });
    }

    if (toStatusId) {
      qb.andWhere('transition.to_status_id=:toStatusId', {
        toStatusId,
      });
    }

    if (isActive !== undefined) {
      qb.andWhere('transition.is_active=:isActive', {
        isActive,
      });
    }

    qb.orderBy('transition.id', 'DESC');

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
