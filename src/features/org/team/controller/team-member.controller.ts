import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { TeamMemberService } from '../services/team-member.service';

import { TeamMemberFilterDto } from '../dto/team-member-filter.dto';

import { AddTeamMemberDto } from '../dto/add-team-member.dto';

import { UpdateTeamMemberDto } from '../dto/update-team-member.dto';

@Controller('teams/:teamId/members')
export class TeamMemberController {
  constructor(private readonly service: TeamMemberService) {}

  /**
   * Add member to team
   *
   * POST
   * /teams/{teamId}/members
   *
   * Body:
   * {
   *   "userId": 10,
   *   "role": "MEMBER"
   * }
   */
  @Post()
  addMember(
    @Param('teamId', ParseIntPipe)
    teamId: number,

    @Body()
    dto: AddTeamMemberDto,
  ) {
    return this.service.addMember(teamId, dto);
  }

  /**
   * Get team members
   *
   * GET
   * /teams/{teamId}/members
   *
   * Example:
   *
   * /teams/1/members?page=1&limit=20
   *
   * /teams/1/members?
   * page=1
   * &limit=20
   * &sortBy=createdAt
   * &sortOrder=DESC
   */
  @Get()
  findAll(
    @Param('teamId', ParseIntPipe)
    teamId: number,

    @Query()
    filter: TeamMemberFilterDto,
  ) {
    return this.service.findByTeam(teamId, filter);
  }

  /**
   * Get single team member
   *
   * GET
   * /teams/{teamId}/members/{id}
   */
  @Get(':id')
  findOne(
    @Param('teamId', ParseIntPipe)
    teamId: number,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(teamId, id);
  }

  /**
   * Update member
   *
   * PATCH
   * /teams/{teamId}/members/{id}
   *
   * Example:
   *
   * {
   *   "role":"MANAGER"
   * }
   */
  @Patch(':id')
  update(
    @Param('teamId', ParseIntPipe)
    teamId: number,

    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateTeamMemberDto,
  ) {
    return this.service.update(teamId, id, dto);
  }

  /**
   * Set team manager
   *
   * PATCH
   * /teams/{teamId}/members/{id}/manager
   */
  @Patch(':id/manager')
  setManager(
    @Param('teamId', ParseIntPipe)
    teamId: number,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.setManager(teamId, id);
  }

  /**
   * Activate member
   *
   * PATCH
   * /teams/{teamId}/members/{id}/activate
   */
  @Patch(':id/activate')
  activate(
    @Param('teamId', ParseIntPipe)
    teamId: number,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.activate(teamId, id);
  }

  /**
   * Deactivate member
   *
   * PATCH
   * /teams/{teamId}/members/{id}/deactivate
   */
  @Patch(':id/deactivate')
  deactivate(
    @Param('teamId', ParseIntPipe)
    teamId: number,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.deactivate(teamId, id);
  }

  /**
   * Remove member from team
   *
   * Soft delete
   *
   * DELETE
   * /teams/{teamId}/members/{id}
   */
  @Delete(':id')
  remove(
    @Param('teamId', ParseIntPipe)
    teamId: number,

    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.remove(teamId, id);
  }
}
