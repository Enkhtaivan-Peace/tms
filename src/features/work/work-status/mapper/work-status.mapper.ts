import { WorkStatusEntity } from '../entities/work-status.entity';

import { WorkStatusResponseDto } from '../dto/work-status-response.dto';

export class WorkStatusMapper {
  static toResponse(entity: WorkStatusEntity): WorkStatusResponseDto {
    return {
      id: entity.id,

      code: entity.code,

      name: entity.name,

      category: entity.category,

      isInitial: entity.isInitial,

      isFinal: entity.isFinal,

      isActive: entity.isActive,
    };
  }

  static toEntity(dto: any): Partial<WorkStatusEntity> {
    return {
      code: dto.code,

      name: dto.name,

      description: dto.description,

      color: dto.color,

      icon: dto.icon,

      category: dto.category ?? 'OPEN',

      isInitial: dto.isInitial ?? false,

      isFinal: dto.isFinal ?? false,

      isActive: dto.isActive ?? true,

      sortOrder: dto.sortOrder ?? 0,
    };
  }
}
