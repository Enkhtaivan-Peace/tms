import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkItemAssignmentEntity } from './entities/work-item-assignment.entity';

import { WorkItemAssignmentRepository } from './repositories/work-item-assignment.repository';

import { WorkItemAssignmentService } from './services/work-item-assignment.service';
import { WorkItemAssignmentHistoryModule } from '../work-item-assignment-history/work-item-assignment-history.module';
import { WorkActivityModule } from '../work-activity/work-activity.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkItemAssignmentEntity]),
    WorkItemAssignmentHistoryModule,
    WorkActivityModule,
  ],

  providers: [WorkItemAssignmentRepository, WorkItemAssignmentService],

  exports: [WorkItemAssignmentService],
})
export class WorkItemAssignmentModule {}
