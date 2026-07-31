import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { BaseQueryRepository } from 'src/common/base/base-query.repository';
import { User } from '../entities/user.entity';
import { UserFilterDto } from '../dto/user-filter.dto copy';

@Injectable()
export class UserQueryRepository extends BaseQueryRepository<User> {
  constructor(private readonly datasource: DataSource) {
    super(datasource.getRepository(User));
  }

  async findAll(filter: UserFilterDto) {
    return this.paginate({
      filter,

      searchFields: ['email', 'username', 'status'],

      defaultSort: 'username',

      relations: {
        userRoles: {
          role: true,
        },
      },
    });
  }
}
