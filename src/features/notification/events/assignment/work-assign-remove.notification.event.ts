export class WorkItemAssignmentRemovedEvent {
  constructor(
    /**
     * Work item id
     */
    public readonly workItemId: number,

    /**
     * Removed user
     */
    public readonly userId: number | undefined,

    /**
     * Previous assignment role
     */
    public readonly role: string,

    /**
     * Removed by
     */
    public readonly removedBy: number,
  ) {}
}
