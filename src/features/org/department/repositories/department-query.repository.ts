import { Injectable } from '@nestjs/common';

import { DataSource, Like, IsNull } from 'typeorm';

import { DepartmentEntity } from '../entities/department.entity';
import { BaseQueryRepository } from 'src/common/base/base-query.repository';
import { DepartmentFilterDto } from '../dto/department-filter.dto';

@Injectable()
export class DepartmentQueryRepository extends BaseQueryRepository<DepartmentEntity> {
  constructor(private readonly datasource: DataSource) {
    super(datasource.getRepository(DepartmentEntity));
  }

  async findAll(filter: DepartmentFilterDto) {
    return this.paginate({
      filter,
      searchFields: ['name', 'code'],
      defaultSort: 'name',
    });
  }
}
