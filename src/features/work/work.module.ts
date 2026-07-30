import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkItemEntity } from './work/entities/work-item.entity';

import { WorkAssignmentEntity } from './work/entities/work-assignment.entity';

import { WorkItemController } from './work/controllers/work-item.controller';

import { WorkAssignmentController } from './work/controllers/work-assignment.controller';

import { WorkItemService } from './work/services/work-item.service';

import { WorkAssignmentService } from './work/services/work-assignment.service';

import { WorkItemRepository } from './work/repositories/work-item.repository';

import { WorkAssignmentRepository } from './work/repositories/work-assignment.repository';

import { WorkItemQueryRepository } from './work/repositories/work-item-query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkItemEntity, WorkAssignmentEntity])],

  controllers: [WorkItemController, WorkAssignmentController],

  providers: [
    WorkItemService,

    WorkAssignmentService,

    WorkItemRepository,

    WorkAssignmentRepository,

    WorkItemQueryRepository,
  ],

  exports: [WorkItemService],
})
export class WorkItemModule {}
