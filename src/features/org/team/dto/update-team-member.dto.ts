import { IsEnum } from 'class-validator';

import { TeamMemberRole } from '../enums/team-member-role.enum';

export class UpdateTeamMemberDto {
  @IsEnum(TeamMemberRole)
  role: TeamMemberRole;
}
