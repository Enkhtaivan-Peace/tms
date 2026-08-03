import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { WorkTemplateRepository } from '../repositories/work-template.repository';

import { WorkTemplateQueryRepository } from '../repositories/work-template-query.repository';

import { CreateWorkTemplateDto } from '../dto/create-work-template.dto';

import { UpdateWorkTemplateDto } from '../dto/update-work-template.dto';

import { QueryWorkTemplateDto } from '../dto/query-work-template.dto';

import { WorkTemplateMapper } from '../mapper/work-template.mapper';
import { WorkTemplateStatusRepository } from '../../work-template-status/repositories/work-template-status.repository';
import { WorkTemplateEntity } from '../entities/work-template.entity';
import { WorkTemplateStatusEntity } from '../../work-template-status/entities/work-template-status.entity';

@Injectable()
export class WorkTemplateService {
  constructor(
    private readonly repository: WorkTemplateRepository,

    private readonly queryRepository: WorkTemplateQueryRepository,
    private readonly workTemplateStatusRepository: WorkTemplateStatusRepository,
  ) {}

  /**
   * Create template
   */
  async create(dto: CreateWorkTemplateDto) {
    const exists = await this.repository.existsByCode(dto.code);

    if (exists) {
      throw new ConflictException('Work template code already exists');
    }

    return this.repository.transaction(async (manager) => {
      const entity = WorkTemplateMapper.toEntity(dto);
      const template = await manager.save(WorkTemplateEntity, entity);

      await manager.save(WorkTemplateStatusEntity, {
        workTemplateId: template.id,
        workStatusId: dto.initialStatusId,
        isInitial: true,
        sortOrder: 1,
        isActive: true,
      });
      return template;
    });
  }

  /**
   * List
   */
  async findAll(query: QueryWorkTemplateDto) {
    return this.queryRepository.findAll(query);
  }

  /**
   * Detail
   */
  async findOne(id: number) {
    const template = await this.repository.findDetail(id);

    if (!template) {
      throw new NotFoundException('Work template not found');
    }

    return template;
  }

  /**
   * Update
   */
  async update(
    id: number,

    dto: UpdateWorkTemplateDto,
  ) {
    const template = await this.repository.findDetail(id);

    if (!template) {
      throw new NotFoundException('Work template not found');
    }

    await this.repository.update(id, dto);

    return this.findOne(id);
  }

  /**
   * Soft delete
   */
  async remove(id: number) {
    const template = await this.repository.findDetail(id);

    if (!template) {
      throw new NotFoundException('Work template not found');
    }

    return this.repository.softDelete(id);
  }
}
