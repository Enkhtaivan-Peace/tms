import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { WorkAssignmentEntity } from '../entities/work-assignment.entity';

@Injectable()
export class WorkAssignmentRepository extends Repository<WorkAssignmentEntity> {
  constructor(datasource: DataSource) {
    super(WorkAssignmentEntity, datasource.manager);
  }

  findHistory(workItemId: number) {
    return this.createQueryBuilder('work_assignment')
      .where('work_assignment.workItemId = :workItemId', { workItemId })
      .orderBy('work_assignment.createdAt', 'ASC')
      .getMany();
  }
}
