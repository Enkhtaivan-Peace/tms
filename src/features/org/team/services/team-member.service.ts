import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { IsNull } from 'typeorm';

import { TeamMemberRepository } from '../repositories/team-member.repository';

import { TeamMemberQueryRepository } from '../repositories/team-member-query.repository';

import { AddTeamMemberDto } from '../dto/add-team-member.dto';

import { UpdateTeamMemberDto } from '../dto/update-team-member.dto';

import { TeamMemberFilterDto } from '../dto/team-member-filter.dto';

import { TeamMemberRole } from '../enums/team-member-role.enum';
import { TeamMemberStatus } from '../enums/team-status.enum';

@Injectable()
export class TeamMemberService {
  constructor(
    private readonly repository: TeamMemberRepository,

    private readonly queryRepository: TeamMemberQueryRepository,
  ) {}

  async addMember(teamId: number, dto: AddTeamMemberDto) {
    const exists = await this.repository.existsMember(teamId, dto.userId);

    if (exists) {
      throw new ConflictException('User already exists in team');
    }

    const entity = this.repository.create({
      teamId,

      userId: dto.userId,

      role: dto.role,
    });

    return this.repository.save(entity);
  }

  findByTeam(teamId: number, filter: TeamMemberFilterDto) {
    return this.queryRepository.findByTeam(teamId, filter);
  }

  async findOne(teamId: number, id: number) {
    const member = await this.repository.findOne({
      where: {
        id,

        teamId,

        deletedAt: IsNull(),
      },

      relations: {
        team: true,
      },
    });

    if (!member) {
      throw new NotFoundException('Team member not found');
    }

    return member;
  }

  /**
   * Update member role/status
   */
  async update(
    teamId: number,

    id: number,

    dto: UpdateTeamMemberDto,
  ) {
    const member = await this.findOne(teamId, id);

    Object.assign(member, dto);

    return this.repository.save(member);
  }

  async setManager(
    teamId: number,

    id: number,
  ) {
    return this.update(
      teamId,

      id,

      {
        role: TeamMemberRole.MANAGER,
      },
    );
  }

  async activate(
    teamId: number,

    id: number,
  ) {
    return this.update(
      teamId,

      id,

      {
        status: TeamMemberStatus.ACTIVE,
      },
    );
  }

  async deactivate(
    teamId: number,

    id: number,
  ) {
    return this.update(
      teamId,

      id,

      {
        status: TeamMemberStatus.INACTIVE,
      },
    );
  }

  async remove(
    teamId: number,

    id: number,
  ) {
    const member = await this.findOne(teamId, id);

    return this.repository.softRemove(member);
  }
}
