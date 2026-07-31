import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PermissionRepository } from '../repositories/permission.repository';

import { CreatePermissionDto } from '../dto/create-permission.dto';
import { PermissionFilterDto } from '../dto/permission-filter.dto';
import { PermissionQueryRepository } from '../repositories/permission-query.repository copy';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly queryRepository: PermissionQueryRepository,
  ) {}

  findAll(filter: PermissionFilterDto) {
    return this.queryRepository.findAll(filter);
  }

  async findOne(id: number) {
    const permission = await this.permissionRepository.findById(id);

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    return permission;
  }

  async create(data: CreatePermissionDto) {
    return this.permissionRepository.create({
      ...data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.permissionRepository.softDelete(id);
  }
}
