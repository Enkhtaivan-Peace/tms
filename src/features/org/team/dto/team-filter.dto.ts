import { PaginationDto } from 'src/common/dto/pagination.dto';

import { IsEnum, IsOptional } from 'class-validator';

import { TeamStatus } from '../enums/team-status.enum';

export class TeamFilterDto extends PaginationDto {
  @IsOptional()
  @IsEnum(TeamStatus)
  status?: TeamStatus;
}
