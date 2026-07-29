import { IsEnum, IsNumber } from 'class-validator';

import { TeamMemberRole } from '../enums/team-member-role.enum';

export class AddTeamMemberDto {
  @IsNumber()
  userId: number;

  @IsEnum(TeamMemberRole)
  role: TeamMemberRole = TeamMemberRole.MEMBER;
}
