import { WorkItemEntity } from '../entities/work-item.entity';

import { CreateWorkItemDto } from '../dto/create-work-item.dto';

export class WorkItemMapper {
  static toEntity(dto: CreateWorkItemDto): Partial<WorkItemEntity> {
    return {
      title: dto.title,

      description: dto.description,

      workTemplateId: dto.workTemplateId,

      priority: dto.priority,

      estimatedHours: dto.estimatedHours,

      dueDate: dto.dueDate,
    };
  }
}
