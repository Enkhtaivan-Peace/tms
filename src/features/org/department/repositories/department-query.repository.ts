import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { DepartmentEntity } from '../entities/department.entity';

@Injectable()
export class DepartmentQueryRepository {
  constructor(private readonly datasource: DataSource) {}

  async findAll(filter: any) {
    const qb = this.datasource
      .getRepository(DepartmentEntity)
      .createQueryBuilder('department')

      .where('department.deleted_at IS NULL');

    if (filter.organizationId) {
      qb.andWhere('department.organization_id=:orgId', {
        orgId: filter.organizationId,
      });
    }

    if (filter.search) {
      qb.andWhere(
        `
department.name LIKE :search
OR department.code LIKE :search
`,
        {
          search: `%${filter.search}%`,
        },
      );
    }

    return qb
      .leftJoinAndSelect('department.parent', 'parent')
      .orderBy('department.name', 'ASC')
      .getMany();
  }
}
