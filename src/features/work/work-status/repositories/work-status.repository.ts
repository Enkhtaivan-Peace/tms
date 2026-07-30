import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { WorkStatusEntity } from '../entities/work-status.entity';

import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class WorkStatusRepository extends BaseRepository<WorkStatusEntity> {
  constructor(repository: Repository<WorkStatusEntity>) {
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
