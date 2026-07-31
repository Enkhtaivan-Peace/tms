import { WorkTemplateStatusEntity } from '../entities/work-template-status.entity';

import { CreateWorkTemplateStatusDto } from '../dto/create-work-template-status.dto';

import { UpdateWorkTemplateStatusDto } from '../dto/update-work-template-status.dto';

export class WorkTemplateStatusMapper {
  static toEntity(dto: CreateWorkTemplateStatusDto): WorkTemplateStatusEntity {
    const entity = new WorkTemplateStatusEntity();

    entity.workTemplateId = dto.workTemplateId;

    entity.workStatusId = dto.workStatusId;

    entity.isInitial = dto.isInitial ?? false;

    entity.sortOrder = dto.sortOrder ?? 0;

    entity.isActive = dto.isActive ?? true;

    return entity;
  }

  static updateEntity(
    entity: WorkTemplateStatusEntity,

    dto: UpdateWorkTemplateStatusDto,
  ) {
    if (dto.workStatusId !== undefined) {
      entity.workStatusId = dto.workStatusId;
    }

    if (dto.isInitial !== undefined) {
      entity.isInitial = dto.isInitial;
    }

    if (dto.sortOrder !== undefined) {
      entity.sortOrder = dto.sortOrder;
    }

    if (dto.isActive !== undefined) {
      entity.isActive = dto.isActive;
    }

    return entity;
  }
}
