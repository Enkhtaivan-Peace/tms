import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { IsNull, Repository } from 'typeorm';

import { BaseRepository } from 'src/common/base/base.repository';

import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  constructor(
    @InjectRepository(Permission)
    repository: Repository<Permission>,
  ) {
    super(repository);
  }

  /**
   * Find by permission code
   *
   * Example:
   * work.view
   */
  async findByCode(code: string): Promise<Permission | null> {
    return this.repository.findOne({
      where: {
        code,

        deletedAt: IsNull(),
      },
    });
  }

  /**
   * Find permission detail
   */
  async findDetail(id: number): Promise<Permission | null> {
    return this.repository.findOne({
      where: {
        id,

        deletedAt: IsNull(),
      },

      relations: {
        rolePermissions: {
          role: true,
        },
      },
    });
  }

  /**
   * Check duplicate permission code
   */
  async existsByCode(code: string): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        code,

        deletedAt: IsNull(),
      },
    });

    return count > 0;
  }

  /**
   * Find active permission
   */
  async findActiveById(id: number): Promise<Permission | null> {
    return this.repository.findOne({
      where: {
        id,

        deletedAt: IsNull(),
      },
    });
  }

  /**
   * Find by module
   *
   * Example:
   * WORK
   */
  async findByModule(module: string): Promise<Permission[]> {
    return this.repository.find({
      where: {
        module,

        deletedAt: IsNull(),
      },

      order: {
        action: 'ASC',
      },
    });
  }

  /**
   * Find by module and action
   */
  async findByModuleAction(
    module: string,

    action: string,
  ): Promise<Permission | null> {
    return this.repository.findOne({
      where: {
        module,

        action,

        deletedAt: IsNull(),
      },
    });
  }

  /**
   * Check duplicate module/action
   */
  async existsByModuleAction(
    module: string,

    action: string,
  ): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        module,

        action,

        deletedAt: IsNull(),
      },
    });

    return count > 0;
  }

  /**
   * Soft delete
   */
  async remove(id: number) {
    return this.repository.softDelete(id);
  }
}
