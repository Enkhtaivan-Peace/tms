import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { DepartmentEntity } from '../entities/department.entity';

@Injectable()
export class DepartmentRepository extends Repository<DepartmentEntity> {
  constructor(datasource: DataSource) {
    super(DepartmentEntity, datasource.manager);
  }

  async findActiveById(id: number) {
    return this.findOne({
      where: {
        id,
      },
      withDeleted: false,
    });
  }
}
