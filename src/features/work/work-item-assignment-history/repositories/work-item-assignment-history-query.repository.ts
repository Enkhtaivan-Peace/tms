import { Injectable } from '@nestjs/common';
import { WorkItemAssignmentHistoryRepository } from './work-item-assignment-history.repository';
import { IsNull } from 'typeorm';

@Injectable()
export class WorkItemAssignmentHistoryQueryRepository {
  constructor(
    private readonly repository: WorkItemAssignmentHistoryRepository,
  ) {}

  async findByAssignment(assignmentId: number) {
    return this.repository.findAll({
      where: {
        assignmentId,

        deletedAt: IsNull(),
      },

      relations: {
        assignment: true,
      },
    });
  }
}
