import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkItemEntity } from './entities/work-item.entity';

import { WorkAssignmentEntity } from './entities/work-assignment.entity';

import { WorkItemController } from './controllers/work-item.controller';

import { WorkAssignmentController } from './controllers/work-assignment.controller';

import { WorkItemService } from './services/work-item.service';

import { WorkAssignmentService } from './services/work-assignment.service';

import { WorkItemRepository } from './repositories/work-item.repository';

import { WorkAssignmentRepository } from './repositories/work-assignment.repository';

import { WorkItemQueryRepository } from './repositories/work-item-query.repository';

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
