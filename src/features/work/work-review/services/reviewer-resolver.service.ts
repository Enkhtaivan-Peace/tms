import { Injectable, NotFoundException } from '@nestjs/common';

import { WorkItemEntity } from '../../work-item/entities/work-item.entity';

import { AssignmentRole } from '../../work-item-assignment/enum/work-item-assignment.enum';

@Injectable()
export class ReviewerResolverService {
  async resolveTeamLeader(workItem: WorkItemEntity): Promise<number> {
    const owner = workItem.assignments.find(
      (assignment) => assignment.role === AssignmentRole.OWNER,
    );

    if (!owner?.userId) {
      throw new NotFoundException('Work item owner not found');
    }

    return owner.userId;
  }

  async resolveQA(workItem: WorkItemEntity): Promise<number> {
    const reviewer = workItem.assignments.find(
      (assignment) => assignment.role === AssignmentRole.REVIEWER,
    );

    if (!reviewer?.userId) {
      throw new NotFoundException('QA reviewer not found');
    }

    return reviewer.userId;
  }
}
