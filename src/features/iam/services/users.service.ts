import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';

import { UserRoleRepository } from '../repositories/user-role.repository';
import { UserQueryRepository } from '../repositories/user-query.repository';
import { UserFilterDto } from '../dto/user-filter.dto copy';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly queryRepository: UserQueryRepository,
    private readonly userRoleRepository: UserRoleRepository,
  ) {}

  async findAll(filter: UserFilterDto) {
    return this.queryRepository.findAll(filter);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findById(id, {
      userRoles: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, data: any) {
    await this.findOne(id);

    return this.userRepository.update(id, data);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.userRepository.softDelete(id);
  }

  async assignRole(userId: number, roleId: number) {
    await this.findOne(userId);

    return this.userRoleRepository.assignRole(userId, roleId);
  }

  async removeRole(userId: number, roleId: number) {
    return this.userRoleRepository.removeRole(userId, roleId);
  }
}
