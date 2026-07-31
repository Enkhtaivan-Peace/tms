import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/common/base/base.repository';
import { Repository } from 'typeorm';
import { WorkItemAssignmentHistoryEntity } from '../entities/work-item-assignment-history.entity';

@Injectable()
export class WorkItemAssignmentHistoryRepository extends BaseRepository<WorkItemAssignmentHistoryEntity> {
  constructor(
    @InjectRepository(WorkItemAssignmentHistoryEntity)
    repository: Repository<WorkItemAssignmentHistoryEntity>,
  ) {
    super(repository);
  }
}
