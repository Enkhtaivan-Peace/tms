import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
      },
    });
  }

  async findDefault() {
    return this.repository.findOne({
      where: {
        isDefault: true,
      },
    });
  }
}
