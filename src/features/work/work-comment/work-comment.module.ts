import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkCommentEntity } from './entities/work-comment.entity';

import { WorkCommentService } from './services/work-comment.service';

import { WorkCommentQueryService } from './services/work-comment-query.service';

import { WorkCommentRepository } from './repositories/work-comment.repository';

import { WorkCommentQueryRepository } from './repositories/work-comment-query.repository';

import { WorkItemModule } from '../work-item/work-item.module';
import { WorkCommentController } from './controller/work-comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkCommentEntity]), WorkItemModule],

  controllers: [WorkCommentController],

  providers: [
    WorkCommentService,

    WorkCommentQueryService,

    WorkCommentRepository,

    WorkCommentQueryRepository,
  ],

  exports: [WorkCommentService, WorkCommentQueryService],
})
export class WorkCommentModule {}
