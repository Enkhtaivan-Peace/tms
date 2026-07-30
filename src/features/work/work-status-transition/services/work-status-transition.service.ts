import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { WorkStatusTransitionRepository } from '../repositories/work-status-transition.repository';

import { WorkStatusTransitionQueryRepository } from '../repositories/work-status-transition-query.repository';

import { WorkStatusTransitionMapper } from '../mapper/work-status-transition.mapper';

import { CreateWorkStatusTransitionDto } from '../dto/create-work-status-transition.dto';

import { UpdateWorkStatusTransitionDto } from '../dto/update-work-status-transition.dto';

import { QueryWorkStatusTransitionDto } from '../dto/query-work-status-transition.dto';

@Injectable()
export class WorkStatusTransitionService {
  constructor(
    private readonly repository: WorkStatusTransitionRepository,

    private readonly queryRepository: WorkStatusTransitionQueryRepository,
  ) {}

  async create(dto: CreateWorkStatusTransitionDto) {
    this.validateTransition(dto.fromStatusId, dto.toStatusId);

    const exists = await this.repository.existsTransition(
      dto.fromStatusId,
      dto.toStatusId,
    );

    if (exists) {
      throw new BadRequestException('Transition already exists');
    }

    const entity = WorkStatusTransitionMapper.toEntity(dto);

    return this.repository.create(entity);
  }

  async findAll(query: QueryWorkStatusTransitionDto) {
    return this.queryRepository.findAll(query);
  }

  async findOne(id: number) {
    const result = await this.repository.findById(id);

    if (!result) {
      throw new NotFoundException('Work status transition not found');
    }

    return result;
  }

  async update(id: number, dto: UpdateWorkStatusTransitionDto) {
    const current = await this.findOne(id);

    if (dto.fromStatusId && dto.toStatusId) {
      this.validateTransition(dto.fromStatusId, dto.toStatusId);

      const exists = await this.repository.existsTransition(
        dto.fromStatusId,
        dto.toStatusId,
      );

      if (
        exists &&
        (current.fromStatusId !== dto.fromStatusId ||
          current.toStatusId !== dto.toStatusId)
      ) {
        throw new BadRequestException('Transition already exists');
      }
    }

    await this.repository.update(id, dto);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.repository.softDelete(id);
  }

  private validateTransition(fromStatusId: number, toStatusId: number) {
    if (fromStatusId === toStatusId) {
      throw new BadRequestException('Source and target status cannot be same');
    }
  }
}
