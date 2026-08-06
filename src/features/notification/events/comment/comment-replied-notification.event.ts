export class CommentRepliedNotificationEvent {
  constructor(
    public readonly parentAuthorId: number,
    public readonly commentId: number,
    public readonly actorId: number,
  ) {}
}
