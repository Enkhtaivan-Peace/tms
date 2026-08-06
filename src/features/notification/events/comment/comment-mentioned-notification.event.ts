export class CommentMentionedNotificationEvent {
  constructor(
    public readonly commentId: number,
    public readonly mentionedUserId: number,
    public readonly actorId: number,
    public readonly workItemId: number,
  ) {}
}
