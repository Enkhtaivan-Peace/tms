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

@Injectable()
export class WorkTemplateService {
  constructor(
    private readonly repository: WorkTemplateRepository,

    private readonly queryRepository: WorkTemplateQueryRepository,
  ) {}

  async create(dto: CreateWorkTemplateDto) {
    const exists = await this.repository.findByCode(dto.code);

    if (exists) {
      throw new ConflictException('Work template code already exists');
    }

    const entity = WorkTemplateMapper.toEntity(dto);

    return this.repository.create(entity);
  }

  async findAll(query: QueryWorkTemplateDto) {
    return this.queryRepository.findAll(query);
  }

  async findOne(id: number) {
    const result = await this.repository.findById(id, {
      workType: true,
      workCategory: true,
      initialStatus: true,
    });

    if (!result) {
      throw new NotFoundException('Work template not found');
    }

    return result;
  }

  async update(id: number, dto: UpdateWorkTemplateDto) {
    const template = await this.findOne(id);

    if (dto.code && dto.code !== template.code) {
      const exists = await this.repository.findByCode(dto.code);

      if (exists) {
        throw new ConflictException('Work template code already exists');
      }
    }

    WorkTemplateMapper.updateEntity(template, dto);

    return this.repository.create(template);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.repository.softDelete(id);
  }

  async setDefault(id: number) {
    await this.repository.updateWhere(
      {
        isDefault: true,
      },
      {
        isDefault: false,
      },
    );

    return this.repository.update(id, {
      isDefault: true,
    });
  }
}
