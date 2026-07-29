import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateDepartmentDto } from '../dto/create-department.dto';

import { DepartmentRepository } from '../repositories/department.repository';

import { DepartmentQueryRepository } from '../repositories/department-query.repository';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly repository: DepartmentRepository,

    private readonly queryRepository: DepartmentQueryRepository,
  ) {}

  async create(dto: CreateDepartmentDto) {
    const entity = this.repository.create(dto);

    return this.repository.save(entity);
  }

  async findAll(filter: any) {
    return this.queryRepository.findAll(filter);
  }

  async findOne(id: number) {
    const result = await this.repository.findActiveById(id);

    if (!result) throw new NotFoundException('Department not found');

    return result;
  }

  async update(id: number, dto: any) {
    await this.repository.update(id, dto);

    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repository.softDelete(id);
  }
}
