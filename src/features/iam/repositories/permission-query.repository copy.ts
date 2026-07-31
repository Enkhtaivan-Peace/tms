import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { BaseQueryRepository } from 'src/common/base/base-query.repository';

import { Permission } from '../entities/permission.entity';

import { PermissionFilterDto } from '../dto/permission-filter.dto';

@Injectable()
export class PermissionQueryRepository extends BaseQueryRepository<Permission> {
  constructor(private readonly datasource: DataSource) {
    super(datasource.getRepository(Permission));
  }

  async findAll(filter: PermissionFilterDto) {
    return this.paginate({
      filter,

      searchFields: ['code', 'module', 'action'],

      defaultSort: 'module',
    });
  }
}
