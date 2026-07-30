import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { WorkItemEntity } from '../entities/work-item.entity';

@Injectable()
export class WorkItemRepository extends Repository<WorkItemEntity> {
  constructor(datasource: DataSource) {
    super(WorkItemEntity, datasource.manager);
  }

  findActive(id: number) {
    return this.findOne({
      // cast to any to avoid TypeScript complaining if deletedAt isn't in the entity type
      where: {
        id,
        deletedAt: null,
      } as any,
    });
  }

  findByDepartment(departmentId: number) {
    return this.find({
      // cast to any to include deletedAt check even if not present on the typed entity
      where: {
        departmentId,
        deletedAt: null,
      } as any,

      order: {
        createdAt: 'DESC',
      } as any,
    });
  }
}
