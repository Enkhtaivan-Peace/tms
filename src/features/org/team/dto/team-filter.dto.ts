import { PaginationDto } from 'src/common/dto/pagination.dto';

import { TeamStatus } from '../enums/team-status.enum';

import { IsEnum, IsOptional } from 'class-validator';

export class TeamFilterDto extends PaginationDto {
  @IsOptional()
  @IsEnum(TeamStatus)
  status?: TeamStatus;
}
