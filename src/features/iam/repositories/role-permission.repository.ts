import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '../../../common/base/base.repository';

import { RolePermission } from '../entities/role-permission.entity';

@Injectable()
export class RolePermissionRepository extends BaseRepository<RolePermission> {
  constructor(datasource: DataSource) {
    super(datasource.getRepository(RolePermission));
  }

  async assignPermission(roleId: number, permissionId: number) {
    return this.create({
      roleId,

      permissionId,
    });
  }

  async removePermission(roleId: number, permissionId: number) {
    return this.repository.delete({
      roleId,

      permissionId,
    });
  }

  async existsPermission(roleId: number, permissionId: number) {
    return this.exists({
      roleId,

      permissionId,
    });
  }

  async findRolePermissions(roleId: number) {
    return this.repository.find({
      where: {
        roleId,
      },

      relations: {
        permission: true,
      },
    });
  }
}
