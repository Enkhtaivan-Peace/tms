export class WorkStatusChangedNotificationEvent {
  constructor(
    /**
     * Work item id
     */
    public readonly workItemId: number,

    /**
     * Current assignee
     */
    public readonly assignedUserId: number,

    /**
     * Previous status
     */
    public readonly previousStatus: string,

    /**
     * New status
     */
    public readonly newStatus: string,
  ) {}
}
