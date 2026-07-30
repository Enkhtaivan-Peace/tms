import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { WorkItemEntity } from '../entities/work-item.entity';

@Injectable()
export class WorkItemQueryRepository {
  constructor(private datasource: DataSource) {}

  async findAll(filter: any) {
    const qb = this.datasource
      .getRepository(WorkItemEntity)
      .createQueryBuilder('work');

    if (filter.departmentId) {
      qb.andWhere('work.departmentId = :departmentId', {
        departmentId: filter.departmentId,
      });
    }

    if (filter.status) {
      qb.andWhere('work.status = :status', {
        status: filter.status,
      });
    }

    return qb.orderBy('work.createdAt', 'DESC').getMany();
  }
}
