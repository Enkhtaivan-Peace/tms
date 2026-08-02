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
import { WorkActivityService } from '../../work-activity/services/work-activity.service';
import { WorkActivityAction } from '../../work-activity/enums/work-activity-action.enum';
import { WorkStatusTransitionService } from '../../work-status-transition/services/work-status-transition.service';

@Injectable()
export class WorkItemService {
  constructor(
    private readonly repository: WorkItemRepository,
    private readonly queryRepository: WorkItemQueryRepository,
    private readonly templateRepository: WorkTemplateRepository,
    private readonly sequenceService: SequenceService,
    private readonly activityService: WorkActivityService,
    private readonly transitionService: WorkStatusTransitionService,
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
    const created = await this.repository.create(entity);

    await this.activityService.create({
      workItemId: entity.id!,
      actorId: userId,
      action: WorkActivityAction.CREATED,
      description: 'Work item created',
      newValue: {
        code: created.code,
        title: created.title,
        priority: created.priority,
        statusId: created.statusId,
      },
    });

    return created;
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

  async updateStatus(id: number, statusId: number, actorId: number) {
    const item = await this.repository.findActiveById(id);

    if (!item) {
      throw new NotFoundException('Work item not found');
    }

    const oldStatus = item.statusId;
    const oldStatusId = item.statusId;
    /**
     * Validate workflow transition
     */
    await this.transitionService.canTransition(oldStatusId, statusId);
    await this.repository.updateStatus(id, statusId);
    await this.activityService.create({
      workItemId: id,
      actorId,
      action: WorkActivityAction.STATUS_CHANGED,
      fieldName: 'statusId',
      oldValue: {
        statusId: oldStatus,
      },
      newValue: {
        statusId,
      },
      description: 'Work item status changed',
    });

    return this.findOne(id);
  }

  /**
   * Update Work Item
   */
  async update(
    id: number,

    dto: any,

    actorId: number,
  ) {
    const old = await this.findOne(id);
    await this.repository.update(id, dto);
    await this.activityService.create({
      workItemId: id,
      actorId,
      action: WorkActivityAction.UPDATED,
      oldValue: {
        title: old.title,
        description: old.description,
        priority: old.priority,
        estimatedHours: old.estimatedHours,
        dueDate: old.dueDate,
        statusId: old.statusId,
      },
      newValue: dto,
      description: 'Work item updated',
    });

    return this.findOne(id);
  }

  /**
   * Soft delete
   */
  async remove(
    id: number,

    actorId: number,
  ) {
    const item = await this.repository.findActiveById(id);

    if (!item) {
      throw new NotFoundException('Work item not found');
    }

    await this.repository.remove(id);

    await this.activityService.create({
      workItemId: id,
      actorId,
      action: WorkActivityAction.DELETED,
      description: 'Work item deleted',
    });

    return {
      success: true,
    };
  }
}
