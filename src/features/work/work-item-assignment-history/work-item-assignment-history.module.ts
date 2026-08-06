import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkItemAssignmentHistoryEntity } from './entities/work-item-assignment-history.entity';
import { WorkItemAssignmentHistoryRepository } from './repositories/work-item-assignment-history.repository';
import { WorkItemAssignmentHistoryService } from './services/work-item-assignment-history.service';
import { WorkItemAssignmentHistoryController } from './controller/work-item-assignment-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkItemAssignmentHistoryEntity])],

  providers: [
    WorkItemAssignmentHistoryRepository,

    WorkItemAssignmentHistoryService,
  ],
  controllers: [WorkItemAssignmentHistoryController],
  exports: [
    WorkItemAssignmentHistoryService,
    WorkItemAssignmentHistoryRepository,
  ],
})
export class WorkItemAssignmentHistoryModule {}
