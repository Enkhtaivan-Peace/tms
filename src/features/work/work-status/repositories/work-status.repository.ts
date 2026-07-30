import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorkStatusEntity } from '../entities/work-status.entity';

import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class WorkStatusRepository extends BaseRepository<WorkStatusEntity> {
  constructor(
    @InjectRepository(WorkStatusEntity)
    repository: Repository<WorkStatusEntity>,
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
}
