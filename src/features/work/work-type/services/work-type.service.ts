import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { WorkTypeRepository } from '../repositories/work-type.repository';

import { WorkTypeQueryRepository } from '../repositories/work-type-query.repository';

import { CreateWorkTypeDto } from '../dto/create-work-type.dto';

import { QueryWorkTypeDto } from '../dto/query-work-type.dto';

import { WorkTypeMapper } from '../mapper/work-type.mapper';
import { UpdateWorkTypeDto } from '../dto/update-work-type.dto';

@Injectable()
export class WorkTypeService {
  constructor(
    private readonly repository: WorkTypeRepository,

    private readonly queryRepository: WorkTypeQueryRepository,
  ) {}

  /**
   * Create Work Type
   */
  async create(dto: CreateWorkTypeDto, userId?: number) {
    const exists = await this.repository.findByCode(dto.code);

    if (exists) {
      throw new ConflictException('Work type code already exists');
    }

    const entity = await this.repository.create({
      ...dto,

      createdBy: userId,
    });

    return WorkTypeMapper.toResponse(entity);
  }

  /**
   * Update Work Type
   */
  async update(
    id: number,

    dto: UpdateWorkTypeDto,

    userId?: number,
  ) {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException('Work type not found');
    }

    if (dto.code && dto.code !== entity.code) {
      const exists = await this.repository.findByCode(dto.code);

      if (exists) {
        throw new ConflictException('Work type code already exists');
      }
    }

    const updated = await this.repository.update(
      id,

      {
        ...dto,

        updatedBy: userId,
      },
    );

    return WorkTypeMapper.toResponse(updated!);
  }

  /**
   * Find one
   */
  async findOne(id: number) {
    const entity = await this.repository.findOne({
      id,
    } as any);

    if (!entity) {
      throw new NotFoundException('Work type not found');
    }

    return WorkTypeMapper.toResponse(entity);
  }

  /**
   * Find all
   */
  async findAll(query: QueryWorkTypeDto) {
    const result = await this.queryRepository.findAll(query);

    return {
      ...result,

      data: WorkTypeMapper.toResponseList(result.data),
    };
  }

  /**
   * Soft delete
   */
  async remove(
    id: number,

    userId?: number,
  ) {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException('Work type not found');
    }

    await this.repository.update(
      id,

      {
        deletedAt: new Date(),

        deletedBy: userId,
      },
    );

    return {
      success: true,
    };
  }
}
