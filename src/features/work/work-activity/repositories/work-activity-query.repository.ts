import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { BaseQueryRepository } from 'src/common/base/base-query.repository';

import { WorkActivityEntity } from '../entities/work-activity.entity';
import { WorkActivityFilterDto } from '../dto/work-activity-filter.dto';

@Injectable()
export class WorkActivityQueryRepository extends BaseQueryRepository<WorkActivityEntity> {
  constructor(private readonly datasource: DataSource) {
    super(datasource.getRepository(WorkActivityEntity));
  }

  /**
   * Pagination + Search + Sort
   */
  async findAll(filter: WorkActivityFilterDto) {
    return this.paginate({
      filter,

      searchFields: ['description', 'fieldName'],

      defaultSort: 'createdAt',
    });
  }
}
