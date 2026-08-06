import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entity/notification.entity';
import { NotificationRepository } from './repository/notification.repository';
import { NotificationService } from './service/notification.service';
import { WorkAssignedNotificationListener } from './listener/assignment/work-assigned-notification.listener';
import { WorkStatusChangedNotificationListener } from './listener/work-status/work-status-changed-notification.listener';

import { WorkItemAssignmentRoleChangedListener } from './listener/assignment/work-item-assignment-role-changed.listener';
import { WorkItemAssignmentRemovedListener } from './listener/assignment/work-item-assignment-removed.listener';
import { CommentCreatedNotificationListener } from './listener/comment/comment-created-notification.listener';
import { CommentDeletedNotificationListener } from './listener/comment/comment-deleted-notification.listener';
import { CommentMentionedNotificationListener } from './listener/comment/comment-mentioned-notification.listener';
import { CommentRepliedNotificationListener } from './listener/comment/comment-replied-notification.listener';
import { CommentUpdatedNotificationListener } from './listener/comment/comment-updated-notification.listener';
import { WorkItemAssignmentModule } from '../work/work-item-assignment/work-item-assignment.module';
import { NotificationRecipientResolverService } from './service/notification-recipient-resolver.service';
import { NotificationRoutingService } from './service/notification-routing.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),

    /**
     * NotificationRecipientResolverService
     * WorkItemAssignmentRepository ашиглана
     */

    WorkItemAssignmentModule,
  ],

  providers: [
    NotificationRepository,

    NotificationService,

    /**
     * Recipient resolve layer
     */
    NotificationRecipientResolverService,

    /**
     * Event routing layer
     */
    NotificationRoutingService,

    WorkAssignedNotificationListener,

    WorkStatusChangedNotificationListener,

    WorkItemAssignmentRoleChangedListener,

    WorkItemAssignmentRemovedListener,

    CommentCreatedNotificationListener,

    CommentUpdatedNotificationListener,

    CommentDeletedNotificationListener,

    CommentMentionedNotificationListener,

    CommentRepliedNotificationListener,
  ],

  exports: [NotificationService, NotificationRoutingService],
})
export class NotificationModule {}
