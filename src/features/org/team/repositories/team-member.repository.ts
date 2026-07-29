import { Injectable } from '@nestjs/common';

import { DataSource, Repository, IsNull } from 'typeorm';

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
        deletedAt: IsNull(),
      },
    });
  }

  async existsMember(teamId: number, userId: number) {
    return this.exists({
      where: {
        teamId,
        userId,
        deletedAt: IsNull(),
      },
    });
  }

  async removeMember(teamId: number, id: number) {
    return this.softDelete({
      id,
      teamId,
    });
  }
}
