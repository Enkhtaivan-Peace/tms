import { IsEnum, IsOptional } from 'class-validator';

import { TeamMemberRole } from '../enums/team-member-role.enum';
import { TeamMemberStatus } from '../enums/team-status.enum';

export class UpdateTeamMemberDto {
  @IsOptional()
  @IsEnum(TeamMemberRole)
  role?: TeamMemberRole;

  @IsOptional()
  @IsEnum(TeamMemberStatus)
  status?: TeamMemberStatus;
}
