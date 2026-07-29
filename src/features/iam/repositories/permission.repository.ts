import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '../../../common/base/base.repository';

import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  constructor(datasource: DataSource) {
    super(datasource.getRepository(Permission));
  }

  async findByCode(code: string) {
    return this.repository.findOne({
      where: {
        code,
      },
    });
  }

  async findByModule(module: string) {
    return this.repository.find({
      where: {
        module,
      },

      order: {
        action: 'ASC',
      },
    });
  }

  async codeExists(code: string) {
    return this.exists({
      code,
    });
  }

  async findAllGroupedByModule() {
    return this.repository
      .createQueryBuilder('permission')

      .orderBy('permission.module', 'ASC')

      .addOrderBy('permission.action', 'ASC')

      .getMany();
  }
}
