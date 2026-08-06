import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkActivityEntity } from './entities/work-activity.entity';

import { WorkActivityRepository } from './repositories/work-activity.repository';

import { WorkActivityQueryRepository } from './repositories/work-activity-query.repository';

import { WorkActivityService } from './services/work-activity.service';

import { WorkActivityController } from './controller/work-activity.controller';
import { WorkTimelineController } from './controller/work-timeline.controller';
import { WorkTimelineQueryService } from './services/work-timeline-query.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkActivityEntity])],

  controllers: [WorkActivityController, WorkTimelineController],

  providers: [
    WorkActivityRepository,
    WorkActivityQueryRepository,
    WorkActivityService,
    WorkTimelineQueryService,
  ],

  exports: [
    WorkActivityService,
    WorkTimelineQueryService,
    WorkActivityRepository,
  ],
})
export class WorkActivityModule {}
