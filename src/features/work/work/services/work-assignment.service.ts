import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { WorkAssignmentRepository } from '../repositories/work-assignment.repository';

import { WorkItemRepository } from '../repositories/work-item.repository';

import { AssignWorkItemDto } from '../dto/assign-work-item.dto';

import { WorkStatus } from '../enums/work-status.enum';

@Injectable()
export class WorkAssignmentService {
  constructor(
    private assignmentRepository: WorkAssignmentRepository,

    private workRepository: WorkItemRepository,
  ) {}

  async assign(workItemId: number, dto: AssignWorkItemDto, assignedBy: number) {
    const work = await this.workRepository.findActive(workItemId);

    if (!work) {
      throw new NotFoundException('Work item not found');
    }

    if (dto.teamId && dto.userId) {
      throw new BadRequestException('Cannot assign team and user together');
    }

    if (!dto.teamId && !dto.userId) {
      throw new BadRequestException('Team or user required');
    }

    const assignment = this.assignmentRepository.create({
      workItemId,

      assignedTeamId: dto.teamId,

      assignedUserId: dto.userId,

      assignedBy,

      comment: dto.comment,
    });

    await this.assignmentRepository.save(assignment);

    await this.workRepository.update(workItemId, {
      status: WorkStatus.ASSIGNED,
    });

    return assignment;
  }

  history(workItemId: number) {
    return this.assignmentRepository.findHistory(workItemId);
  }
}
