import { Injectable } from '@nestjs/common';

import { DataSource, FindOptionsWhere } from 'typeorm';

import { TeamMemberEntity } from '../entities/team-member.entity';

import { TeamMemberFilterDto } from '../dto/team-member-filter.dto';
import { BaseQueryRepository } from 'src/common/base/base-query.repository';

@Injectable()
export class TeamMemberQueryRepository extends BaseQueryRepository<TeamMemberEntity> {
  constructor(datasource: DataSource) {
    super(datasource.getRepository(TeamMemberEntity));
  }

  async findAll(filter: TeamMemberFilterDto) {
    const where: FindOptionsWhere<TeamMemberEntity> = {};

    if (filter.teamId) {
      where.teamId = filter.teamId;
    }

    if (filter.userId) {
      where.userId = filter.userId;
    }

    if (filter.role) {
      where.role = filter.role;
    }

    return this.paginate({
      filter,

      where,

      defaultSort: 'id',

      relations: {
        team: {
          department: true,
        },
      },
    });
  }

  async findByTeam(
    teamId: number,

    filter: TeamMemberFilterDto,
  ) {
    return this.findAll({
      ...filter,

      teamId,
    });
  }
}
