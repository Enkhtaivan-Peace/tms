import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { WorkStatusRepository } from '../repositories/work-status.repository';
import { WorkStatusQueryRepository } from '../repositories/work-status-query.repository';
import { CreateWorkStatusDto } from '../dto/create-work-status.dto';
import { UpdateWorkStatusDto } from '../dto/update-work-status.dto';
import { QueryWorkStatusDto } from '../dto/query-work-status.dto';
import { WorkStatusMapper } from '../mapper/work-status.mapper';

@Injectable()
export class WorkStatusService {
  constructor(
    private readonly repository: WorkStatusRepository,
    private readonly queryRepository: WorkStatusQueryRepository,
  ) {}

  async create(dto: CreateWorkStatusDto) {
    const exists = await this.repository.findByCode(dto.code);

    if (exists) {
      throw new ConflictException('Work status code already exists');
    }

    return this.repository.create(WorkStatusMapper.toEntity(dto));
  }

  async findAll(query: QueryWorkStatusDto) {
    return this.queryRepository.findAll(query);
  }

  async findOne(id: number) {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new NotFoundException('Work status not found');
    }

    return entity;
  }

  async findByCode(code: string) {
    const entity = await this.repository.findByCode(code);

    if (!entity) {
      throw new NotFoundException(`Work status '${code}' not found`);
    }

    return entity;
  }

  async update(id: number, dto: UpdateWorkStatusDto) {
    await this.repository.update(id, dto);

    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repository.softDelete(id);
  }
}
