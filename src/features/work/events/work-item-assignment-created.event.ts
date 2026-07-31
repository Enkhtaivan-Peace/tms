import { WorkItemAssignmentEntity } from '../work-item-assignment/entities/work-item-assignment.entity';

export class WorkItemAssignmentCreatedEvent {
  constructor(
    public readonly assignment: WorkItemAssignmentEntity,

    public readonly actorId: number,
  ) {}
}
