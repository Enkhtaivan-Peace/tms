import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { Transform } from 'class-transformer';

import { PaginationDto } from 'src/common/dto/pagination.dto';

import { TeamMemberRole } from '../enums/team-member-role.enum';

export class TeamMemberFilterDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  teamId?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsEnum(TeamMemberRole)
  role?: TeamMemberRole;
}
