export enum NotificationType {
  WORK_CREATED = 'WORK_CREATED',

  /**
   * Ажил ажилтанд оноогдсон
   *
   * Example:
   * Manager -> John
   */
  WORK_ASSIGNED = 'WORK_ASSIGNED',

  /**
   * Ажлын assignment өөрчлөгдсөн
   *
   * Example:
   * John -> Bob
   */
  WORK_REASSIGNED = 'WORK_REASSIGNED',

  /**
   * Assignment цуцлагдсан
   */
  WORK_UNASSIGNED = 'WORK_UNASSIGNED',

  /**
   * Work status өөрчлөгдсөн
   *
   * TO-DO -> IN_PROGRESS
   */
  WORK_STATUS_CHANGED = 'WORK_STATUS_CHANGED',

  /**
   * Work priority өөрчлөгдсөн
   */
  WORK_PRIORITY_CHANGED = 'WORK_PRIORITY_CHANGED',

  /**
   * Work due date өөрчлөгдсөн
   */
  WORK_DUE_DATE_CHANGED = 'WORK_DUE_DATE_CHANGED',

  /**
   * Work completed
   */
  WORK_COMPLETED = 'WORK_COMPLETED',

  /**
   * Work cancelled
   */
  WORK_CANCELLED = 'WORK_CANCELLED',

  /**
   * ==========================================
   * COMMENT & COLLABORATION
   * ==========================================
   */

  /**
   * Assigned ажил дээр comment нэмэгдсэн
   */
  COMMENT_ADDED = 'COMMENT_ADDED',

  /**
   * Comment дээр reply хийсэн
   */
  COMMENT_REPLY_ADDED = 'COMMENT_REPLY_ADDED',

  /**
   * User comment дотор mention хийсэн
   *
   * @john
   */
  COMMENT_MENTION = 'COMMENT_MENTION',

  /**
   * Comment update болсон
   */
  COMMENT_UPDATED = 'COMMENT_UPDATED',

  /**
   * Comment delete болсон
   */
  COMMENT_DELETED = 'COMMENT_DELETED',

  /**
   * ==========================================
   * WORK REVIEW
   * ==========================================
   */

  /**
   * Review эхэлсэн
   */
  REVIEW_STARTED = 'REVIEW_STARTED',

  /**
   * Reviewer-д review request очсон
   */
  REVIEW_REQUIRED = 'REVIEW_REQUIRED',

  /**
   * Review step хүлээгдэж байгаа
   */
  REVIEW_PENDING = 'REVIEW_PENDING',

  /**
   * Review approve
   */
  REVIEW_APPROVED = 'REVIEW_APPROVED',

  /**
   * Review reject
   */
  REVIEW_REJECTED = 'REVIEW_REJECTED',

  /**
   * Review comment нэмэгдсэн
   */
  REVIEW_COMMENT_ADDED = 'REVIEW_COMMENT_ADDED',

  /**
   * Review completed
   */
  REVIEW_COMPLETED = 'REVIEW_COMPLETED',

  /**
   * ==========================================
   * ASSIGNMENT / TEAM
   * ==========================================
   */

  /**
   * Team-д ажил хуваарилагдсан
   */
  TEAM_WORK_ASSIGNED = 'TEAM_WORK_ASSIGNED',

  /**
   * Team member нэмэгдсэн
   */
  TEAM_MEMBER_ADDED = 'TEAM_MEMBER_ADDED',

  /**
   * Team member removed
   */
  TEAM_MEMBER_REMOVED = 'TEAM_MEMBER_REMOVED',

  /**
   * ==========================================
   * SLA / DEADLINE
   * ==========================================
   */

  /**
   * Due date ойртож байна
   */
  SLA_WARNING = 'SLA_WARNING',

  /**
   * Due date хэтэрсэн
   */
  SLA_OVERDUE = 'SLA_OVERDUE',

  /**
   * SLA violation
   */
  SLA_BREACHED = 'SLA_BREACHED',

  /**
   * SLA extension
   */
  SLA_EXTENDED = 'SLA_EXTENDED',

  /**
   * ==========================================
   * ATTACHMENT
   * ==========================================
   */

  /**
   * File upload хийсэн
   */
  ATTACHMENT_ADDED = 'ATTACHMENT_ADDED',

  /**
   * Attachment устгасан
   */
  ATTACHMENT_REMOVED = 'ATTACHMENT_REMOVED',

  /**
   * ==========================================
   * TEMPLATE / AUTOMATION
   * ==========================================
   */

  /**
   * Template-аас task үүссэн
   */
  TEMPLATE_WORK_CREATED = 'TEMPLATE_WORK_CREATED',

  /**
   * Automation rule ажилласан
   */
  AUTOMATION_TRIGGERED = 'AUTOMATION_TRIGGERED',

  /**
   * ==========================================
   * SYSTEM
   * ==========================================
   */

  /**
   * System notification
   */
  SYSTEM = 'SYSTEM',

  /**
   * Security notification
   */
  SECURITY_ALERT = 'SECURITY_ALERT',
}
