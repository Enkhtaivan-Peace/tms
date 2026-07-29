import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PermissionRepository } from '../repositories/permission.repository';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async findAll() {
    return this.permissionRepository.findAll();
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findById(id);

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  async create(data: any) {
    const exists = await this.permissionRepository.codeExists(data.code);

    if (exists) {
      throw new ConflictException('Permission exists');
    }

    return this.permissionRepository.create(data);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.permissionRepository.softDelete(id);
  }
}
