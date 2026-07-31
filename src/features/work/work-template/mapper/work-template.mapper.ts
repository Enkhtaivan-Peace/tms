import { WorkTemplateEntity } from '../entities/work-template.entity';

import { CreateWorkTemplateDto } from '../dto/create-work-template.dto';

import { UpdateWorkTemplateDto } from '../dto/update-work-template.dto';

export class WorkTemplateMapper {
  static toEntity(dto: CreateWorkTemplateDto): WorkTemplateEntity {
    const entity = new WorkTemplateEntity();

    entity.code = dto.code;

    entity.name = dto.name;

    entity.description = dto.description;

    entity.workTypeId = dto.workTypeId;

    entity.workCategoryId = dto.workCategoryId;

    entity.initialStatusId = dto.initialStatusId;

    entity.defaultPriority = dto.defaultPriority ?? 'MEDIUM';

    entity.estimatedHours = dto.estimatedHours ?? 0;

    entity.allowAttachment = dto.allowAttachment ?? true;

    entity.allowComment = dto.allowComment ?? true;

    entity.isDefault = dto.isDefault ?? false;

    entity.isActive = dto.isActive ?? true;

    entity.sortOrder = dto.sortOrder ?? 0;

    return entity;
  }

  static updateEntity(entity: WorkTemplateEntity, dto: UpdateWorkTemplateDto) {
    Object.assign(entity, dto);

    return entity;
  }
}
