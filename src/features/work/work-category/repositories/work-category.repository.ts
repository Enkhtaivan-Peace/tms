import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { WorkCategoryEntity } from '../entities/work-category.entity';

import { BaseRepository } from 'src/common/base/base.repository';

@Injectable()
export class WorkCategoryRepository extends BaseRepository<WorkCategoryEntity> {
  constructor(
    @InjectRepository(WorkCategoryEntity)
    repository: Repository<WorkCategoryEntity>,
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
