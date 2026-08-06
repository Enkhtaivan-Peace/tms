import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
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
import { CreateSubTaskDto } from '../dto/create-sub-task.dto';
import { WorkItemAssignmentService } from '../../work-item-assignment/services/work-item-assignment.service';
import { AssignmentRole } from '../../work-item-assignment/enum/work-item-assignment.enum';
import { WorkItemEntity } from '../entities/work-item.entity';
import { WorkStatusService } from '../../work-status/services/work-status.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WorkStatusChangedEvent } from '../../work-status/events/work-status-changed.event';

@Injectable()
export class WorkItemService {
  constructor(
    private readonly repository: WorkItemRepository,
    private readonly queryRepository: WorkItemQueryRepository,
    private readonly templateRepository: WorkTemplateRepository,
    private readonly sequenceService: SequenceService,
    private readonly activityService: WorkActivityService,
    private readonly transitionService: WorkStatusTransitionService,
    private readonly assignmentService: WorkItemAssignmentService,
    private readonly statusService: WorkStatusService,
    private readonly eventEmitter: EventEmitter2,
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
      workItemId: created.id!,
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

    const fromStatusId = item.statusId;

    /**
     * 2. Validate workflow transition
     *
     * Example:
     * ASSIGNED -> IN_PROGRESS
     * IN_PROGRESS -> WAITING_REVIEW
     */
    const transition = await this.transitionService.canTransition(
      fromStatusId,
      statusId,
    );

    await this.repository.updateStatus(id, statusId);

    /** Create activity history **/
    await this.activityService.create({
      workItemId: id,
      actorId,
      action: WorkActivityAction.STATUS_CHANGED,
      fieldName: 'statusId',
      oldValue: {
        statusId: fromStatusId,
      },
      newValue: {
        statusId,
      },
      description: transition.description ?? 'Work item status changed',
    });
    await this.handleSubTaskCompletion(item, statusId, actorId);

    /**
     * Notification Event
     */
    const owner = await this.assignmentService.findOwnerByWorkItem(id);

    if (owner?.userId) {
      const oldStatus = await this.statusService.findOne(fromStatusId);

      const newStatus = await this.statusService.findOne(statusId);

      this.eventEmitter.emit(
        'notification.work.status.changed',
        new WorkStatusChangedEvent(
          id,
          owner.userId,
          oldStatus.code,
          newStatus.code,
        ),
      );
    }

    return this.findOne(id);
  }

  /*** Update Work Item */
  async update(id: number, dto: any, actorId: number) {
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
  async remove(id: number, actorId: number) {
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

  async createSubTask(parentId: number, dto: CreateSubTaskDto, userId: number) {
    /**
     * 1. Find parent
     */
    const parent = await this.repository.findDetail(parentId);

    if (!parent) {
      throw new NotFoundException('Parent work item not found');
    }

    /**
     * 2. Validate parent status
     *
     * Completed task дотор
     * sub task үүсгэхгүй
     */
    if (parent.status?.code === WorkActivityAction.COMPLETED) {
      throw new BadRequestException(
        'Cannot create sub task for completed work item',
      );
    }

    /**
     * 3. Generate child code
     *
     * Parent template sequence ашиглана
     */
    const code = await this.sequenceService.next(
      parent.workTemplate.sequenceKey!,
    );

    const created = await this.repository.create({
      code,
      title: dto.title,
      description: dto.description,
      workTemplateId: parent.workTemplateId,
      statusId: parent.statusId,
      priority: dto.priority ?? parent.priority,
      estimatedHours: dto.estimatedHours ?? 0,
      parentWorkItemId: parent.id,
      createdBy: userId,
    });

    /**
     * 5. Assign user
     */
    if (dto.assigneeId) {
      await this.assignmentService.assign(
        created.id!,
        {
          userId: dto.assigneeId,
          role: AssignmentRole.OWNER,
        },
        userId,
      );
    }

    /**
     * 6. Activity
     */
    await this.activityService.create({
      workItemId: created.id!,
      actorId: userId,
      action: WorkActivityAction.CREATED,
      description: WorkActivityAction.SUB_TASK_CREATED,
      newValue: {
        parentWorkItemId: parent.id,
        code: created.code,
        title: created.title,
      },
    });

    return created;
  }

  async findSubTasks(parentId: number) {
    const parent = await this.repository.findActiveById(parentId);

    if (!parent) {
      throw new NotFoundException('Parent work item not found');
    }

    return this.repository.findChildren(parentId);
  }

  async findParent(id: number) {
    const item = await this.repository.findActiveById(id);

    if (!item) {
      throw new NotFoundException('Work item not found');
    }

    return this.repository.findParent(id);
  }

  async getTree(id: number) {
    const item = await this.repository.findTree(id);

    if (!item) {
      throw new NotFoundException('Work item not found');
    }

    return item;
  }

  private async handleSubTaskCompletion(
    item: WorkItemEntity,
    newStatusId: number,
    actorId: number,
  ) {
    if (!item.parentWorkItemId) {
      return;
    }

    const status = await this.statusService.findOne(newStatusId);

    if (status.code !== 'COMPLETED') {
      return;
    }

    await this.activityService.create({
      workItemId: item.id!,

      actorId,

      action: WorkActivityAction.SUB_TASK_COMPLETED,

      description: 'Sub task completed',

      newValue: {
        statusId: newStatusId,
        parentWorkItemId: item.parentWorkItemId,
      },
    });

    await this.calculateParentProgress(item.parentWorkItemId);
  }

  async calculateParentProgress(parentId: number) {
    const children = await this.repository.findChildren(parentId);

    if (!children.length) {
      return {
        progress: 0,
        total: 0,
        completed: 0,
      };
    }

    const total = children.length;

    const completed = children.filter(
      (child) => child.status?.code === 'COMPLETED',
    ).length;

    const progress = Math.round((completed / total) * 100);

    return {
      parentId,

      total,

      completed,

      progress,
    };
  }
}
