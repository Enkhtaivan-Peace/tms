import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkCommentEntity } from './entities/work-comment.entity';

import { WorkCommentService } from './services/work-comment.service';

import { WorkCommentQueryService } from './services/work-comment-query.service';

import { WorkCommentRepository } from './repositories/work-comment.repository';

import { WorkCommentQueryRepository } from './repositories/work-comment-query.repository';

import { WorkItemModule } from '../work-item/work-item.module';
import { WorkCommentController } from './controller/work-comment.controller';
import { WorkActivityModule } from '../work-activity/work-activity.module';
import { CommentCreatedListener } from './listeners/comment-created.listener';
import { CommentUpdatedListener } from './listeners/comment-updated.listener';
import { CommentDeletedListener } from './listeners/comment-deleted.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkCommentEntity]),
    WorkItemModule,
    WorkActivityModule,
  ],

  controllers: [WorkCommentController],

  providers: [
    WorkCommentService,
    WorkCommentQueryService,
    WorkCommentRepository,
    WorkCommentQueryRepository,
    WorkCommentService,
    CommentCreatedListener,
    CommentUpdatedListener,
    CommentDeletedListener,
  ],

  exports: [WorkCommentService, WorkCommentQueryService],
})
export class WorkCommentModule {}
