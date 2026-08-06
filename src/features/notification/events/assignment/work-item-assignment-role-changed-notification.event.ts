export class WorkItemAssignmentRoleChangedEvent {
  constructor(
    /**
     * Work item
     */
    public readonly workItemId: number,

    /**
     * User receiving notification
     */
    public readonly userId: number,

    /**
     * Previous role
     */
    public readonly oldRole: string,

    /**
     * New role
     */
    public readonly newRole: string,

    /**
     * Changed by
     */
    public readonly actorId: number,
  ) {}
}
