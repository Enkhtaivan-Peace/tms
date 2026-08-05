// events/comment-updated.event.ts

export class CommentUpdatedEvent {
  constructor(
    public readonly commentId: number,

    public readonly workItemId: number,

    public readonly authorId: number,

    public readonly oldContent: string,

    public readonly newContent: string,
  ) {}
}
