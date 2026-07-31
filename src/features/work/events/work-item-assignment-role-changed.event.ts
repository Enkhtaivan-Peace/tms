import { AssignmentRole } from '../work-item-assignment/enum/work-item-assignment.enum';

export class WorkItemAssignmentRoleChangedEvent {
  constructor(
    public readonly assignmentId: number,

    public readonly workItemId: number,

    public readonly oldRole: AssignmentRole,

    public readonly newRole: AssignmentRole,

    public readonly actorId: number,
  ) {}
}
