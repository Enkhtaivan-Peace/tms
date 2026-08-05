import { Module } from '@nestjs/common';

import { WorkTypeModule } from './work-type/work-type.module';
import { WorkCategoryModule } from './work-category/work-category.module';
import { WorkStatusModule } from './work-status/work-status.module';
import { WorkStatusTransitionModule } from './work-status-transition/work-status-transition.module';
import { WorkTemplateModule } from './work-template/work-template.module';
import { WorkTemplateStatusModule } from './work-template-status/work-template-status.module';
import { WorkItemModule } from './work-item/work-item.module';
import { WorkItemAssignmentModule } from './work-item-assignment/work-item-assignment.module';
import { NotificationModule } from './notification/notification.module';
import { WorkItemAssignmentHistoryModule } from './work-item-assignment-history/work-item-assignment-history.module';
import { WorkReviewModule } from './work-review/work-review.module';
import { WorkCommentModule } from './work-comment/work-comment.module';
import { WorkTimelineModule } from './work-timeline/work-timeline.module';

@Module({
  imports: [
    WorkTypeModule,
    WorkCategoryModule,
    WorkStatusModule,
    WorkStatusTransitionModule,
    WorkTemplateModule,
    WorkTemplateStatusModule,
    WorkItemModule,
    NotificationModule,
    WorkItemAssignmentModule,
    WorkItemAssignmentHistoryModule,
    WorkReviewModule,
    WorkCommentModule,
    WorkTimelineModule,
  ],
})
export class WorkModule {}
