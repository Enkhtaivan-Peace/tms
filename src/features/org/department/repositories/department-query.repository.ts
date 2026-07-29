import { Injectable } from '@nestjs/common';

import { DataSource, Like, IsNull } from 'typeorm';

import { DepartmentEntity } from '../entities/department.entity';
import { BaseQueryRepository } from 'src/common/base/base-query.repository';

@Injectable()
export class DepartmentQueryRepository extends BaseQueryRepository<DepartmentEntity> {
  constructor(private readonly datasource: DataSource) {
    super(datasource.getRepository(DepartmentEntity));
  }

  findAll(filter: any) {
    return this.paginate({
      filter,

      searchFields: ['name', 'code'],

      defaultSort: 'name',
    });
  }
}
