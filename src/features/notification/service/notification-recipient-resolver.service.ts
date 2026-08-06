import { Injectable } from '@nestjs/common';

import { WorkItemAssignmentRepository } from '../../work/work-item-assignment/repositories/work-item-assignment.repository';

import { AssignmentRole } from '../../work/work-item-assignment/enum/work-item-assignment.enum';

@Injectable()
export class NotificationRecipientResolverService {
  constructor(
    private readonly assignmentRepository: WorkItemAssignmentRepository,
  ) {}

  /**
   * Work Owner
   */
  async getOwner(workItemId: number): Promise<number | null> {
    const owner =
      await this.assignmentRepository.findOwnerByWorkItem(workItemId);

    return owner?.userId ?? null;
  }

  /**
   * Members
   */
  async getMembers(workItemId: number): Promise<number[]> {
    const assignments = await this.assignmentRepository.findByRole(
      workItemId,
      AssignmentRole.MEMBER,
    );

    return assignments.filter((x) => !!x.userId).map((x) => x.userId!);
  }

  /**
   * Reviewers
   */
  async getReviewers(workItemId: number): Promise<number[]> {
    const assignments = await this.assignmentRepository.findByRole(
      workItemId,
      AssignmentRole.REVIEWER,
    );

    return assignments.filter((x) => !!x.userId).map((x) => x.userId!);
  }

  /**
   * All assigned users
   */
  async getParticipants(workItemId: number): Promise<number[]> {
    const assignments =
      await this.assignmentRepository.findByWorkItem(workItemId);

    return [
      ...new Set(assignments.filter((x) => !!x.userId).map((x) => x.userId!)),
    ];
  }
}
