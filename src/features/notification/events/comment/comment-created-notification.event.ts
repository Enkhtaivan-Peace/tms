export class WorkCommentCreatedNotificationEvent {
  constructor(
    public readonly workItemId: number,
    public readonly commentId: number,
    public readonly authorId: number,
    public readonly assignedUserId: number,
  ) {}
}
