import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { IsNull, Repository } from 'typeorm';
import { WorkItemAssignmentEntity } from '../entities/work-item-assignment.entity';
import { AssignmentRole } from '../enum/work-item-assignment.enum';

@Injectable()
export class WorkItemAssignmentRepository extends BaseRepository<WorkItemAssignmentEntity> {
  constructor(
    @InjectRepository(WorkItemAssignmentEntity)
    repository: Repository<WorkItemAssignmentEntity>,
  ) {
    super(repository);
  }

  async findByWorkItem(workItemId: number) {
    return this.findAll({
      where: {
        workItemId,
        deletedAt: IsNull(),
      },

      relations: {
        user: true,
        team: true,
      },
    });
  }

  async existsOwner(workItemId: number) {
    return this.exists({
      workItemId,

      role: AssignmentRole.OWNER,

      deletedAt: IsNull(),
    });
  }
}
