import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '../../../common/base/base.repository';

import { UserRole } from '../entities/user-role.entity';

@Injectable()
export class UserRoleRepository extends BaseRepository<UserRole> {
  constructor(datasource: DataSource) {
    super(datasource.getRepository(UserRole));
  }

  async assignRole(userId: number, roleId: number) {
    return this.create({
      userId,

      roleId,
    });
  }

  async removeRole(userId: number, roleId: number) {
    return this.repository.delete({
      userId,

      roleId,
    });
  }

  async existsUserRole(userId: number, roleId: number) {
    return this.exists({
      userId,

      roleId,
    });
  }

  async findUserRoles(userId: number) {
    return this.repository.find({
      where: {
        userId,
      },

      relations: {
        role: true,
      },
    });
  }
}
