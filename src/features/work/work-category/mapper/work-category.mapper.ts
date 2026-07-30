import { WorkCategoryEntity } from '../entities/work-category.entity';

import { WorkCategoryResponseDto } from '../dto/work-category-response.dto';

export class WorkCategoryMapper {
  static toResponse(entity: WorkCategoryEntity): WorkCategoryResponseDto {
    return {
      id: entity.id,

      code: entity.code,

      name: entity.name,

      description: entity.description,

      color: entity.color,

      isActive: entity.isActive,

      sortOrder: entity.sortOrder,
    };
  }

  static toEntity(dto: any): Partial<WorkCategoryEntity> {
    return {
      code: dto.code,

      name: dto.name,

      description: dto.description,

      color: dto.color,

      icon: dto.icon,

      isDefault: dto.isDefault ?? false,

      isActive: dto.isActive ?? true,

      sortOrder: dto.sortOrder ?? 0,
    };
  }
}
