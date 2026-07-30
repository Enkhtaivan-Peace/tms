import { Injectable, NotFoundException } from '@nestjs/common';

import { WorkItemRepository } from '../repositories/work-item.repository';

import { CreateWorkItemDto } from '../dto/create-work-item.dto';

import { UpdateWorkItemDto } from '../dto/update-work-item.dto';

import { WorkStatus } from '../enums/work-status.enum';

@Injectable()
export class WorkItemService {
  constructor(private repository: WorkItemRepository) {}

  create(dto: CreateWorkItemDto, userId: number) {
    const item = this.repository.create({
      ...dto,

      createdBy: userId,

      status: WorkStatus.NEW,
    });

    return this.repository.save(item);
  }

  findOne(id: number) {
    return this.repository.findActive(id);
  }

  findByDepartment(departmentId: number) {
    return this.repository.findByDepartment(departmentId);
  }

  async update(id: number, dto: UpdateWorkItemDto) {
    const item = await this.findOne(id);

    if (!item) {
      throw new NotFoundException('Work item not found');
    }

    await this.repository.update(id, dto);

    return this.findOne(id);
  }

  async updateStatus(id: number, status: WorkStatus) {
    await this.repository.update(id, {
      status,
    });

    return this.findOne(id);
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
