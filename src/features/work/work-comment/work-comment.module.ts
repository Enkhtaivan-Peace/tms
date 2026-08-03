import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkCommentEntity } from './entities/work-comment.entity';

import { WorkCommentController } from './controller/work-comment.controller';

import { WorkCommentService } from './services/work-comment.service';

import { WorkCommentRepository } from './repositories/work-comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkCommentEntity])],

  controllers: [WorkCommentController],

  providers: [WorkCommentService, WorkCommentRepository],

  exports: [WorkCommentService],
})
export class WorkCommentModule {}
