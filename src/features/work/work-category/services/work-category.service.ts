import { Injectable, NotFoundException } from '@nestjs/common';

import { WorkCategoryRepository } from '../repositories/work-category.repository';

import { WorkCategoryQueryRepository } from '../repositories/work-category-query.repository';

import { CreateWorkCategoryDto } from '../dto/create-work-category.dto';

import { UpdateWorkCategoryDto } from '../dto/update-work-category.dto';

import { QueryWorkCategoryDto } from '../dto/query-work-category.dto';

import { WorkCategoryMapper } from '../mapper/work-category.mapper';

@Injectable()
export class WorkCategoryService {
  constructor(
    private readonly repository: WorkCategoryRepository,

    private readonly queryRepository: WorkCategoryQueryRepository,
  ) {}

  async create(dto: CreateWorkCategoryDto) {
    const entity = WorkCategoryMapper.toEntity(dto);

    return this.repository.create(entity);
  }

  async findAll(query: QueryWorkCategoryDto) {
    return this.queryRepository.findAll(query);
  }

  async findOne(id: number) {
    const result = await this.repository.findById(id);

    if (!result) {
      throw new NotFoundException('Work category not found');
    }

    return result;
  }

  async update(id: number, dto: UpdateWorkCategoryDto) {
    await this.repository.update(id, dto);

    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repository.softDelete(id);
  }
}
