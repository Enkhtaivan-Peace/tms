import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { RoleRepository } from '../repositories/role.repository';

import { RolePermissionRepository } from '../repositories/role-permission.repository';
import { SequenceService } from 'src/common/sequence/services/sequence.service';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    private readonly roleRepository: RoleRepository,

    private readonly rolePermissionRepository: RolePermissionRepository,
    private readonly sequenceService: SequenceService,
  ) {}

  async findAll() {
    return this.roleRepository.findAll({
      relations: {
        rolePermissions: {
          permission: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findWithPermissions(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async create(data: CreateRoleDto) {
    const code = await this.sequenceService.next('ROLE');

    return this.roleRepository.create({
      ...data,
      code,
    });
  }

  async update(id: number, data: any) {
    await this.findOne(id);

    return this.roleRepository.update(id, data);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.roleRepository.softDelete(id);
  }

  async assignPermission(roleId: number, permissionId: number) {
    await this.findOne(roleId);

    return this.rolePermissionRepository.assignPermission(roleId, permissionId);
  }
}
