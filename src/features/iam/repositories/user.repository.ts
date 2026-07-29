import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '../../../common/base/base.repository';

import { User } from '../entities/user.entity';
import { UserStatus } from 'src/common/helpers/enums/user-status.enum';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(datasource: DataSource) {
    super(datasource.getRepository(User));
  }

  /**
   * Find user by username
   */
  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        username,
      },

      relations: {
        userRoles: {
          role: true,
        },
      },
    });
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }

  /**
   * Find active user
   */
  async findActiveById(id: number) {
    return this.repository.findOne({
      where: {
        id,
        status: UserStatus.ACTIVE,
      },

      relations: {
        userRoles: {
          role: true,
        },
      },
    });
  }

  /**
   * Check username exists
   */
  async usernameExists(username: string) {
    return this.exists({
      username,
    });
  }

  /**
   * Check email exists
   */
  async emailExists(email: string) {
    return this.exists({
      email,
    });
  }

  /**
   * Load user permissions
   */
  async findUserWithPermissions(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },

      relations: {
        userRoles: {
          role: {
            rolePermissions: {
              permission: true,
            },
          },
        },
      },
    });
  }
}
