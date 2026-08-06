export class WorkStatusChangedEvent {
  constructor(
    public readonly workItemId: number,
    public readonly userId: number,
    public readonly oldStatus: string,
    public readonly newStatus: string,
  ) {}
}
