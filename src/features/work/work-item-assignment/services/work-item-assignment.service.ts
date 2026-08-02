import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { WorkItemAssignmentRepository } from '../repositories/work-item-assignment.repository';

import { AssignWorkItemDto } from '../dto/assign-work-item.dto';

import { ChangeAssignmentRoleDto } from '../dto/change-assignment-role.dto';

import { WorkItemAssignmentEntity } from '../entities/work-item-assignment.entity';

import { IsNull } from 'typeorm';
import { AssignmentRole } from '../enum/work-item-assignment.enum';
import { WorkItemAssignmentHistoryService } from '../../work-item-assignment-history/services/work-item-assignment-history.service';
import { WorkItemAssignmentCreatedEvent } from '../../events/work-item-assignment-created.event';
import { WorkItemAssignmentRoleChangedEvent } from '../../events/work-item-assignment-role-changed.event';
import { WorkItemAssignmentRemovedEvent } from '../../events/work-item-assignment-removed.event';
import { WorkActivityService } from '../../work-activity/services/work-activity.service';
import { WorkActivityAction } from '../../work-activity/enums/work-activity-action.enum';

@Injectable()
export class WorkItemAssignmentService {
  constructor(
    private readonly repository: WorkItemAssignmentRepository,

    private readonly historyService: WorkItemAssignmentHistoryService,
    private readonly eventEmitter: EventEmitter2,
    private readonly activityService: WorkActivityService,
  ) {}

  /**
   * Get assignments by WorkItem
   */
  async findByWorkItem(
    workItemId: number,
  ): Promise<WorkItemAssignmentEntity[]> {
    return this.repository.findAll({
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

  /**
   * Assign user/team to WorkItem
   */
  async assign(
    workItemId: number,

    dto: AssignWorkItemDto,

    actorId: number,
  ) {
    // if (dto.userId && dto.teamId) {
    //   throw new BadRequestException('Only user or team can be assigned');
    // }
    return this.repository.transaction(async (manager) => {
      /* OWNER validation */
      if (dto.role === AssignmentRole.OWNER) {
        const exists = await this.repository.exists({
          workItemId,
          role: AssignmentRole.OWNER,
          deletedAt: IsNull(),
        });

        if (exists) {
          throw new BadRequestException('WorkItem already has OWNER');
        }
      }

      const assignment = await this.repository.create({
        workItemId,
        userId: dto.userId,
        teamId: dto.teamId,
        role: dto.role,
        assignedBy: actorId,
      });

      await this.historyService.assigned(assignment, actorId);

      await this.activityService.create({
        workItemId: assignment.workItemId,
        actorId,
        action: WorkActivityAction.ASSIGNED,
        newValue: {
          assignmentId: assignment.id,
          userId: assignment.userId,
          teamId: assignment.teamId,
          role: assignment.role,
        },

        description: 'Work item assigned',
      });

      this.eventEmitter.emit(
        'work-item.assignment.created',
        new WorkItemAssignmentCreatedEvent(assignment, actorId),
      );

      return assignment;
    });
  }

  /**
   * Change assignment role
   */
  async changeRole(
    assignmentId: number,
    dto: ChangeAssignmentRoleDto,
    actorId: number,
  ): Promise<WorkItemAssignmentEntity> {
    const assignment = await this.repository.findOne(
      {
        id: assignmentId,
        deletedAt: IsNull(),
      },
      {
        user: true,
        team: true,
      },
    );

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    /**
     * OWNER rule
     */
    if (
      dto.role === AssignmentRole.OWNER &&
      assignment.role !== AssignmentRole.OWNER
    ) {
      const ownerExists = await this.repository.exists({
        workItemId: assignment.workItemId,
        role: AssignmentRole.OWNER,
        deletedAt: IsNull(),
      });

      if (ownerExists) {
        throw new BadRequestException('WorkItem already has OWNER');
      }
    }

    const oldRole = assignment.role;

    const updated = await this.repository.update(assignmentId, {
      role: dto.role,
    });

    await this.historyService.roleChanged(
      assignment,
      oldRole,
      dto.role,
      actorId,
    );

    await this.activityService.create({
      workItemId: assignment.workItemId,
      actorId,
      action: WorkActivityAction.ROLE_CHANGED,
      fieldName: 'role',
      oldValue: {
        role: oldRole,
      },
      newValue: {
        role: dto.role,
      },
      description: 'Assignment role changed',
    });

    this.eventEmitter.emit(
      'work-item.assignment.role.changed',

      new WorkItemAssignmentRoleChangedEvent(
        assignmentId,
        assignment.workItemId,
        oldRole,
        dto.role,
        actorId,
      ),
    );

    return updated!;
  }

  /**
   * Remove assignment
   */
  async remove(assignmentId: number, actorId: number): Promise<void> {
    const assignment = await this.repository.findOne(
      {
        id: assignmentId,
        deletedAt: IsNull(),
      },

      {
        user: true,
        team: true,
      },
    );

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    /**
     * Create history before delete
     */
    await this.historyService.removed(assignment, actorId);

    await this.activityService.create({
      workItemId: assignment.workItemId,
      actorId,
      action: WorkActivityAction.UNASSIGNED,
      oldValue: {
        assignmentId: assignment.id,
        userId: assignment.userId,
        teamId: assignment.teamId,
        role: assignment.role,
      },
      description: 'Work item assignment removed',
    });

    await this.repository.softDelete(assignmentId);
    this.eventEmitter.emit(
      'work-item.assignment.removed',

      new WorkItemAssignmentRemovedEvent(
        assignment.id,

        assignment.workItemId,

        actorId,
      ),
    );
  }
}
