import { Injectable } from '@nestjs/common';

import { Repository, IsNull } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { WorkTypeEntity } from '../entities/work-type.entity';

import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class WorkTypeRepository extends BaseRepository<WorkTypeEntity> {
  constructor(
    @InjectRepository(WorkTypeEntity)
    repository: Repository<WorkTypeEntity>,
  ) {
    super(repository);
  }

  async findByCode(code: string) {
    return this.repository.findOne({
      where: {
        code,

        deletedAt: IsNull(),
      },
    });
  }
}
