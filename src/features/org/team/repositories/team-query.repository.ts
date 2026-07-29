import { Injectable } from '@nestjs/common';

import { DataSource, IsNull, Like } from 'typeorm';

import { TeamEntity } from '../entities/team.entity';
import { TeamFilterDto } from '../dto/team-filter.dto';
import { SortOrder } from 'src/common/dto/pagination.dto';
import { BaseQueryRepository } from 'src/common/base/base-query.repository';

@Injectable()
export class TeamQueryRepository extends BaseQueryRepository<TeamEntity> {
  constructor(private datasource: DataSource) {
    super(datasource.getRepository(TeamEntity));
  }

  findByDepartment(departmentId: number) {
    return this.datasource
      .getRepository(TeamEntity)
      .createQueryBuilder('team')
      .where('team.departmentId = :departmentId', { departmentId })
      .andWhere('team.deletedAt IS NULL')
      .getMany();
  }

  async findAll(filter: TeamFilterDto) {
    return this.paginate({
      filter,

      searchFields: ['name', 'code'],
      defaultSort: 'name',

      relations: {
        department: true,
      },
    });
  }
}
