export class WorkCommentUpdatedNotificationEvent {
  constructor(
    public readonly workItemId: number,

    public readonly commentId: number,

    /**
     * Comment owner
     */
    public readonly authorId: number,

    /**
     * User who updated
     */
    public readonly actorId: number,
  ) {}
}
