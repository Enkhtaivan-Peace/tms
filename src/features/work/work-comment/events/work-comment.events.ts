export enum WorkCommentEventType {
  CREATED = 'WORK_COMMENT_CREATED',
  UPDATED = 'WORK_COMMENT_UPDATED',
  DELETED = 'WORK_COMMENT_DELETED',
}

export interface WorkCommentEventPayload {
  commentId: number;
  workItemId: number;
  userId: number;
  content?: string;
  createdAt?: Date;
}
