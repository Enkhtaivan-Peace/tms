import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { TeamMemberEntity } from '../entities/team-member.entity';

@Injectable()
export class TeamMemberRepository extends Repository<TeamMemberEntity> {
  constructor(datasource: DataSource) {
    super(TeamMemberEntity, datasource.manager);
  }

  async findMember(teamId: number, userId: number) {
    return this.findOne({
      where: {
        teamId,
        userId,
      },
    });
  }

  async findByTeam(teamId: number) {
    return this.find({
      where: {
        teamId,
      },
    });
  }

  async existsUserInTeam(teamId: number, userId: number) {
    const count = await this.count({
      where: {
        teamId,
        userId,
      },
    });

    return count > 0;
  }
}
