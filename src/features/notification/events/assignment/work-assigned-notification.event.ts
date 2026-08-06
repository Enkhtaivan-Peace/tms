export class WorkAssignedNotificationEvent {
  constructor(
    public readonly workItemId: number,
    public readonly assignedUserId: number,
    public readonly assignedBy: number,
  ) {}
}
