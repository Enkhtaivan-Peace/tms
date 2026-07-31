export class WorkItemAssignmentRemovedEvent {
  constructor(
    public readonly assignmentId: number,

    public readonly workItemId: number,

    public readonly actorId: number,
  ) {}
}
