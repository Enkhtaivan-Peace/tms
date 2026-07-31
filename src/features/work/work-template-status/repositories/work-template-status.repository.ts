import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BaseRepository } from 'src/common/base/base.repository';

import { WorkTemplateStatusEntity } from '../entities/work-template-status.entity';

@Injectable()
export class WorkTemplateStatusRepository extends BaseRepository<WorkTemplateStatusEntity> {
  constructor(
    @InjectRepository(WorkTemplateStatusEntity)
    repository: Repository<WorkTemplateStatusEntity>,
  ) {
    super(repository);
  }

  /**
   * Template + Status давхардсан эсэх
   */
  async findByTemplateAndStatus(workTemplateId: number, workStatusId: number) {
    return this.repository.findOne({
      where: {
        workTemplateId,
        workStatusId,
        deletedAt: null,
      } as any,
    });
  }

  /**
   * Template-ийн initial status авах
   */
  async findInitialStatus(workTemplateId: number) {
    return this.repository.findOne({
      where: {
        workTemplateId,
        isInitial: true,
        deletedAt: null,
      } as any,

      relations: {
        workStatus: true,
      },
    });
  }

  /**
   * Template дээрх бүх initial false болгох
   */
  async clearInitialStatus(workTemplateId: number) {
    return this.repository.update(
      {
        workTemplateId,
        isInitial: true,
      },

      {
        isInitial: false,
      },
    );
  }
}
