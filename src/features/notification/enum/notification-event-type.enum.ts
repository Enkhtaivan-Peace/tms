export enum NotificationEventType {
  WORK_ASSIGNED = 'notification.work.assigned',

  WORK_ASSIGNMENT_ROLE_CHANGED = 'notification.work.assignment.role.changed',

  WORK_ASSIGNMENT_REMOVED = 'notification.work.assignment.removed',

  WORK_STATUS_CHANGED = 'notification.work.status.changed',

  COMMENT_CREATED = 'notification.comment.created',

  COMMENT_UPDATED = 'notification.comment.updated',

  COMMENT_DELETED = 'notification.comment.deleted',

  COMMENT_MENTIONED = 'notification.comment.mentioned',

  COMMENT_REPLIED = 'notification.comment.replied',

  REVIEW_SUBMITTED = 'notification.review.submitted',

  REVIEW_APPROVED = 'notification.review.approved',

  REVIEW_REJECTED = 'notification.review.rejected',

  REVIEW_QA_REQUESTED = 'notification.review.qa.requested',

  WORK_CREATED = 'notification.work.created',

  WORK_UPDATED = 'notification.work.updated',

  WORK_DELETED = 'notification.work.deleted',

  SLA_REMINDER = 'notification.sla.reminder',

  SLA_OVERDUE = 'notification.sla.overdue',

  SLA_ESCALATED = 'notification.sla.escalated',

  SYSTEM = 'notification.system',
}
