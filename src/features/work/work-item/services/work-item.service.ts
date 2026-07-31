import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { WorkItemRepository } from '../repositories/work-item.repository';

import { WorkItemQueryRepository } from '../repositories/work-item-query.repository';

import { CreateWorkItemDto } from '../dto/create-work-item.dto';

import { QueryWorkItemDto } from '../dto/query-work-item.dto';

import { WorkItemMapper } from '../mapper/work-item.mapper';

import { WorkTemplateRepository } from '../../work-template/repositories/work-template.repository';
import { SequenceService } from 'src/common/sequence/services/sequence.service';

@Injectable()
export class WorkItemService {
  constructor(
    private readonly repository: WorkItemRepository,

    private readonly queryRepository: WorkItemQueryRepository,

    private readonly templateRepository: WorkTemplateRepository,

    private readonly sequenceService: SequenceService,
  ) {}

  /**
   * Create Work Item
   */
  async create(dto: CreateWorkItemDto, userId: number) {
    /**
     * 1. Load template
     */
    const template = await this.templateRepository.findById(dto.workTemplateId);

    if (!template) {
      throw new NotFoundException('Work template not found');
    }

    /**
     * 2. Generate business code
     *
     * TASK-00001
     */
    const code = await this.sequenceService.next(template.sequenceKey!);

    /**
     * 3. Map DTO
     */
    const entity = WorkItemMapper.toEntity(dto);

    /**
     * 4. Apply template defaults
     */
    entity.code = code;

    entity.statusId = template.initialStatusId;

    entity.priority = dto.priority ?? template.defaultPriority;

    entity.estimatedHours =
      dto.estimatedHours ?? template.defaultEstimatedHours;

    /**
     * 5. Due date calculation
     */
    if (!dto.dueDate && template.defaultDueDays > 0) {
      const due = new Date();

      due.setDate(due.getDate() + template.defaultDueDays);

      entity.dueDate = due;
    }

    /**
     * 6. Audit
     */
    entity.createdBy = userId;

    return this.repository.create(entity);
  }

  async findAll(query: QueryWorkItemDto) {
    return this.queryRepository.findAll(query);
  }

  async findOne(id: number) {
    const item = await this.repository.findDetail(id);

    if (!item) {
      throw new NotFoundException('Work item not found');
    }

    return item;
  }

  async updateStatus(
    id: number,

    statusId: number,
  ) {
    const item = await this.repository.findActiveById(id);

    if (!item) {
      throw new NotFoundException('Work item not found');
    }

    return this.repository.updateStatus(id, statusId);
  }

  async remove(id: number) {
    const item = await this.repository.findActiveById(id);

    if (!item) {
      throw new NotFoundException('Work item not found');
    }

    return this.repository.remove(id);
  }
}
