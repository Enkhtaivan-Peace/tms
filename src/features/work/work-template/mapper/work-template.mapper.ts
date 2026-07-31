import { WorkTemplateEntity } from '../entities/work-template.entity';

import { CreateWorkTemplateDto } from '../dto/create-work-template.dto';

export class WorkTemplateMapper {
  static toEntity(dto: CreateWorkTemplateDto): Partial<WorkTemplateEntity> {
    return {
      /**
       * Identity
       */
      code: dto.code,

      name: dto.name,

      description: dto.description,

      /**
       * Classification
       */
      workTypeId: dto.workTypeId,

      workCategoryId: dto.workCategoryId,

      sequenceKey: dto.sequenceKey ?? dto.codePrefix,

      /**
       * Workflow
       */
      initialStatusId: dto.initialStatusId,

      /**
       * Default values
       */
      defaultPriority: dto.defaultPriority ?? 'MEDIUM',

      defaultEstimatedHours: dto.defaultEstimatedHours ?? 0,

      defaultDueDays: dto.defaultDueDays ?? 0,

      /**
       * Behavior rules
       */
      allowAttachment: dto.allowAttachment ?? true,

      allowComment: dto.allowComment ?? true,

      requireApproval: dto.requireApproval ?? false,

      /**
       * Flags
       */
      isActive: true,
      isDefault: false,
    };
  }
}
