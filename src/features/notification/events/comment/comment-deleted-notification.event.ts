export class CommentDeletedNotificationEvent {
  constructor(
    public readonly workItemId: number,

    public readonly commentId: number,

    public readonly actorId: number,
  ) {}
}
