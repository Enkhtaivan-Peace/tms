import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { WorkTemplateStatusRepository } from '../repositories/work-template-status.repository';

import { WorkTemplateStatusQueryRepository } from '../repositories/work-template-status-query.repository';

import { CreateWorkTemplateStatusDto } from '../dto/create-work-template-status.dto';

import { UpdateWorkTemplateStatusDto } from '../dto/update-work-template-status.dto';

import { QueryWorkTemplateStatusDto } from '../dto/query-work-template-status.dto';

import { WorkTemplateStatusMapper } from '../mapper/work-template-status.mapper';

@Injectable()
export class WorkTemplateStatusService {
  constructor(
    private readonly repository: WorkTemplateStatusRepository,

    private readonly queryRepository: WorkTemplateStatusQueryRepository,
  ) {}

  async create(dto: CreateWorkTemplateStatusDto) {
    const exists = await this.repository.findByTemplateAndStatus(
      dto.workTemplateId,

      dto.workStatusId,
    );

    if (exists) {
      throw new ConflictException('Work status already exists in template');
    }

    if (dto.isInitial) {
      await this.repository.clearInitialStatus(dto.workTemplateId);
    }

    const entity = WorkTemplateStatusMapper.toEntity(dto);

    return this.repository.create(entity);
  }

  async findAll(query: QueryWorkTemplateStatusDto) {
    return this.queryRepository.findAll(query);
  }

  async findOne(id: number) {
    const result = await this.repository.findById(
      id,

      {
        workStatus: true,
        workTemplate: true,
      },
    );

    if (!result) {
      throw new NotFoundException('Work template status not found');
    }

    return result;
  }

  async update(
    id: number,

    dto: UpdateWorkTemplateStatusDto,
  ) {
    const entity = await this.findOne(id);

    if (dto.isInitial === true) {
      await this.repository.clearInitialStatus(entity.workTemplateId);
    }

    WorkTemplateStatusMapper.updateEntity(entity, dto);

    return this.repository.create(entity);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.repository.softDelete(id);
  }

  async getInitialStatus(workTemplateId: number) {
    return this.repository.findInitialStatus(workTemplateId);
  }
}
