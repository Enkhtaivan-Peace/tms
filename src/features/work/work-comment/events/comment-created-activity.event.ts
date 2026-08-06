// events/comment-created.event.ts

export class CommentCreatedActivityEvent {
  constructor(
    public readonly commentId: number,

    public readonly workItemId: number,

    public readonly authorId: number,

    public readonly content: string,
  ) {}
}
