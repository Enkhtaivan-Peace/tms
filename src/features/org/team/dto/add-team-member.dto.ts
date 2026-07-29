import { IsEnum, IsNumber } from 'class-validator';

import { Transform } from 'class-transformer';

import { TeamMemberRole } from '../enums/team-member-role.enum';

export class AddTeamMemberDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  userId!: number;

  @IsEnum(TeamMemberRole)
  role!: TeamMemberRole;
}
