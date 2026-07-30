import { WorkTypeEntity } from '../entities/work-type.entity';

import { WorkTypeResponseDto } from '../dto/work-type-response.dto';

export class WorkTypeMapper {
  static toResponse(entity: WorkTypeEntity): WorkTypeResponseDto {
    return {
      id: entity.id,
      code: entity.code,
      name: entity.name,
      color: entity.color,
      icon: entity.icon,
      description: entity.description,
      isDefault: entity.isDefault,
      isActive: entity.isActive,
      sortOrder: entity.sortOrder,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toResponseList(entities: WorkTypeEntity[]): WorkTypeResponseDto[] {
    return entities.map((entity) => this.toResponse(entity));
  }
}
