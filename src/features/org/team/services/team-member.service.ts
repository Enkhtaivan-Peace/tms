import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { TeamMemberRepository } from '../repositories/team-member.repository';

import { TeamRepository } from '../repositories/team.repository';

import { AddTeamMemberDto } from '../dto/add-team-member.dto';

import { UpdateTeamMemberDto } from '../dto/update-team-member.dto';

import { TeamMemberRole } from '../enums/team-member-role.enum';

@Injectable()
export class TeamMemberService {
  constructor(
    private readonly teamRepository: TeamRepository,

    private readonly teamMemberRepository: TeamMemberRepository,
  ) {}

  /**
   * Add user into team
   *
   * POST /teams/:teamId/members
   */
  async addMember(teamId: number, dto: AddTeamMemberDto) {
    // 1. Check team exists

    const team = await this.teamRepository.findActive(teamId);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    // 2. Check duplicate member

    const exists = await this.teamMemberRepository.findMember(
      teamId,
      dto.userId,
    );

    if (exists) {
      throw new ConflictException('User already exists in this team');
    }

    // 3. Create member

    const member = this.teamMemberRepository.create({
      teamId,

      userId: dto.userId,

      role: dto.role ?? TeamMemberRole.MEMBER,
    });

    return this.teamMemberRepository.save(member);
  }

  /**
   * Get all members of team
   *
   * GET /teams/:teamId/members
   */
  async findAll(teamId: number) {
    await this.checkTeamExists(teamId);

    return this.teamMemberRepository.findByTeam(teamId);
  }

  /**
   * Get single member
   *
   * GET /teams/:teamId/members/:id
   */
  async findOne(teamId: number, id: number) {
    const member = await this.teamMemberRepository.findOne({
      where: {
        id,

        teamId,
      },
    });

    if (!member) {
      throw new NotFoundException('Team member not found');
    }

    return member;
  }

  /**
   * Update member role
   *
   * PATCH /teams/:teamId/members/:id
   */
  async updateRole(teamId: number, id: number, dto: UpdateTeamMemberDto) {
    const member = await this.findOne(teamId, id);

    await this.teamMemberRepository.update(
      member.id,

      {
        role: dto.role,
      },
    );

    return this.findOne(teamId, id);
  }

  /**
   * Remove member from team
   *
   * DELETE /teams/:teamId/members/:id
   */
  async remove(teamId: number, id: number) {
    const member = await this.findOne(teamId, id);

    await this.teamMemberRepository.softDelete(member.id);

    return {
      success: true,
    };
  }

  /**
   * Restore removed member
   *
   * POST /teams/:teamId/members/:id/restore
   */
  async restore(teamId: number, id: number) {
    const member = await this.teamMemberRepository.findOne({
      where: {
        id,

        teamId,
      },

      withDeleted: true,
    });

    if (!member) {
      throw new NotFoundException('Team member not found');
    }

    await this.teamMemberRepository.restore(id);

    return this.findOne(teamId, id);
  }

  /**
   * Check user belongs to team
   */
  async exists(teamId: number, userId: number) {
    return this.teamMemberRepository.existsUserInTeam(teamId, userId);
  }

  /**
   * Get team users
   */
  async findUsers(teamId: number) {
    await this.checkTeamExists(teamId);

    const members = await this.teamMemberRepository.findByTeam(teamId);

    return members.map((member) => ({
      userId: member.userId,

      role: member.role,
    }));
  }

  /**
   * Internal validation
   */
  private async checkTeamExists(teamId: number) {
    const team = await this.teamRepository.findActive(teamId);

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }
}
