import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '../../../common/base/base.repository';

import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(datasource: DataSource) {
    super(datasource.getRepository(Role));
  }

  /**
   * Find role by code
   */
  async findByCode(code: string) {
    return this.repository.findOne({
      where: {
        code,
      },
    });
  }

  /**
   * Find role with permissions
   */
  async findWithPermissions(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },

      relations: {
        rolePermissions: {
          permission: true,
        },
      },
    });
  }

  /**
   * Check role code
   */
  async codeExists(code: string) {
    return this.exists({
      code,
    });
  }

  /**
   * Get system roles
   */
  async findSystemRoles() {
    return this.repository.find({
      where: {
        isSystem: true,
      },
    });
  }
}
