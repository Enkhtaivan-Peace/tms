import { Injectable } from '@nestjs/common';

import { IsNull } from 'typeorm';

import { AssignmentRole } from '../../work-item-assignment/enum/work-item-assignment.enum';

import { AssignmentHistoryFilterDto } from '../dto/assignment-history-filter.dto';
import { WorkItemAssignmentHistoryRepository } from '../repositories/work-item-assignment.repository';
import { WorkItemAssignmentEntity } from '../../work-item-assignment/entities/work-item-assignment.entity';
import { AssignmentHistoryAction } from '../enum/work-item-assignment-action.enum';

@Injectable()
export class WorkItemAssignmentHistoryService {
  constructor(
    private readonly repository: WorkItemAssignmentHistoryRepository,
  ) {}

  /**
   * Create ASSIGNED history
   */
  async assigned(
    assignment: WorkItemAssignmentEntity,

    actorId: number,
  ) {
    return this.repository.create({
      workItemId: assignment.workItemId,

      assignmentId: assignment.id,

      action: AssignmentHistoryAction.ASSIGNED,

      newRole: assignment.role,

      newUserId: assignment.userId,

      newTeamId: assignment.teamId,

      changedBy: actorId,
    });
  }

  /**
   * Create ROLE_CHANGED history
   */
  async roleChanged(
    assignment: WorkItemAssignmentEntity,

    oldRole: AssignmentRole,

    newRole: AssignmentRole,

    actorId: number,
  ) {
    return this.repository.create({
      workItemId: assignment.workItemId,

      assignmentId: assignment.id,

      action: AssignmentHistoryAction.ROLE_CHANGED,

      oldRole,

      newRole,

      oldUserId: assignment.userId,

      newUserId: assignment.userId,

      oldTeamId: assignment.teamId,

      newTeamId: assignment.teamId,

      changedBy: actorId,
    });
  }

  /**
   * Create REMOVED history
   */
  async removed(
    assignment: WorkItemAssignmentEntity,

    actorId: number,
  ) {
    return this.repository.create({
      workItemId: assignment.workItemId,

      assignmentId: assignment.id,

      action: AssignmentHistoryAction.REMOVED,

      oldRole: assignment.role,

      oldUserId: assignment.userId,

      oldTeamId: assignment.teamId,

      changedBy: actorId,
    });
  }

  /**
   * Get history by Assignment
   */
  async findByAssignment(
    assignmentId: number,

    filter: AssignmentHistoryFilterDto,
  ) {
    const where: any = {
      assignmentId,

      deletedAt: IsNull(),
    };

    if (filter.action) {
      where.action = filter.action;
    }

    if (filter.changedBy) {
      where.changedBy = filter.changedBy;
    }

    return this.repository.paginate(
      {
        page: filter.page ?? 1,

        limit: filter.limit ?? 20,
      },

      where,

      {
        assignment: true,
      },
    );
  }

  /**
   * Get history by WorkItem
   */
  async findByWorkItem(
    workItemId: number,

    filter: AssignmentHistoryFilterDto,
  ) {
    const where: any = {
      workItemId,

      deletedAt: IsNull(),
    };

    if (filter.action) {
      where.action = filter.action;
    }

    if (filter.changedBy) {
      where.changedBy = filter.changedBy;
    }

    if (filter.newUserId) {
      where.newUserId = filter.newUserId;
    }

    if (filter.newTeamId) {
      where.newTeamId = filter.newTeamId;
    }

    return this.repository.paginate(
      {
        page: filter.page ?? 1,

        limit: filter.limit ?? 20,
      },

      where,

      {
        assignment: true,
      },
    );
  }
}
