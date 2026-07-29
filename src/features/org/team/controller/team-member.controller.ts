import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UpdateTeamMemberDto } from '../dto/update-team-member.dto';
import { AddTeamMemberDto } from '../dto/add-team-member.dto';
import { TeamMemberService } from '../services/team-member.service';

@Controller('teams/:teamId/members')
export class TeamMemberController {
  constructor(private readonly service: TeamMemberService) {}

  /**
   * Add user to team
   *
   * POST
   * /teams/{teamId}/members
   *
   */
  @Post()
  addMember(
    @Param('teamId')
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
   */
  @Get()
  findAll(
    @Param('teamId')
    teamId: number,
  ) {
    return this.service.findAll(teamId);
  }

  /**
   * Get member detail
   *
   * GET
   * /teams/{teamId}/members/{id}
   *
   */
  @Get(':id')
  findOne(
    @Param('teamId')
    teamId: number,

    @Param('id')
    id: number,
  ) {
    return this.service.findOne(teamId, id);
  }

  /**
   * Update member role
   *
   * PATCH
   * /teams/{teamId}/members/{id}
   *
   */
  @Patch(':id')
  updateRole(
    @Param('teamId')
    teamId: number,

    @Param('id')
    id: number,

    @Body()
    dto: UpdateTeamMemberDto,
  ) {
    return this.service.updateRole(teamId, id, dto);
  }

  /**
   * Remove member from team
   *
   * DELETE
   * /teams/{teamId}/members/{id}
   *
   */
  @Delete(':id')
  remove(
    @Param('teamId')
    teamId: number,

    @Param('id')
    id: number,
  ) {
    return this.service.remove(teamId, id);
  }
}
