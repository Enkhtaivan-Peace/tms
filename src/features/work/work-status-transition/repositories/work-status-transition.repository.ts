import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BaseRepository } from 'src/common/base/base.repository';

import { WorkStatusTransitionEntity } from '../entities/work-status-transition.entity';

@Injectable()
export class WorkStatusTransitionRepository extends BaseRepository<WorkStatusTransitionEntity> {
  constructor(
    @InjectRepository(WorkStatusTransitionEntity)
    repository: Repository<WorkStatusTransitionEntity>,
  ) {
    super(repository);
  }

  async findByCode(code: string) {
    return this.repository.findOne({
      where: {
        code,
      },
    });
  }

  async existsTransition(fromStatusId: number, toStatusId: number) {
    return this.repository.exists({
      where: {
        fromStatusId,
        toStatusId,
      },
    });
  }
}
