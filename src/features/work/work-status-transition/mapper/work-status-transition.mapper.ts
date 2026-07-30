import { WorkStatusTransitionEntity } from '../entities/work-status-transition.entity';

import { CreateWorkStatusTransitionDto } from '../dto/create-work-status-transition.dto';

export class WorkStatusTransitionMapper {
  static toEntity(dto: CreateWorkStatusTransitionDto) {
    const entity = new WorkStatusTransitionEntity();

    entity.fromStatusId = dto.fromStatusId;

    entity.toStatusId = dto.toStatusId;

    entity.code = dto.code;

    entity.name = dto.name;

    entity.description = dto.description;

    entity.isActive = dto.isActive ?? true;

    return entity;
  }
}
