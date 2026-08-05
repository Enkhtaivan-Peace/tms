import { Module } from '@nestjs/common';
import { WorkActivityModule } from '../work-activity/work-activity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkItemAssignmentModule } from '../work-item-assignment/work-item-assignment.module';
import { WorkCommentModule } from '../work-comment/work-comment.module';
import { WorkReviewModule } from '../work-review/work-review.module';
import { WorkTimelineController } from './controller/work-timeline.controller';
import { TimelineAggregatorService } from './services/timeline-aggregator.service';
import { WorkTimelineQueryService } from './services/work-timeline-query.service';

@Module({
  imports: [
    TypeOrmModule,

    WorkActivityModule,

    WorkItemAssignmentModule,

    WorkReviewModule,

    WorkCommentModule,
  ],

  controllers: [WorkTimelineController],

  providers: [TimelineAggregatorService, WorkTimelineQueryService],

  exports: [WorkTimelineQueryService],
})
export class WorkTimelineModule {}
