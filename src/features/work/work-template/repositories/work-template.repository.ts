import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { IsNull, Repository } from 'typeorm';

import { BaseRepository } from 'src/common/base/base.repository';

import { WorkTemplateEntity } from '../entities/work-template.entity';

@Injectable()
export class WorkTemplateRepository extends BaseRepository<WorkTemplateEntity> {
  constructor(
    @InjectRepository(WorkTemplateEntity)
    repository: Repository<WorkTemplateEntity>,
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

  async existsByCode(code: string) {
    const count = await this.repository.count({
      where: {
        code,

        deletedAt: IsNull(),
      },
    });

    return count > 0;
  }

  async findDetail(id: number) {
    return this.repository.findOne({
      where: {
        id,

        deletedAt: IsNull(),
      },

      relations: {
        workType: true,

        workCategory: true,

        initialStatus: true,
      },
    });
  }
}
