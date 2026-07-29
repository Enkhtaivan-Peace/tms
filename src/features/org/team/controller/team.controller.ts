import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { TeamService } from '../services/team.service';

import { CreateTeamDto } from '../dto/create-team.dto';
import { TeamFilterDto } from '../dto/team-filter.dto';

@Controller('teams')
export class TeamController {
  constructor(private service: TeamService) {}

  @Post()
  create(
    @Body()
    dto: CreateTeamDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query()
    filter: TeamFilterDto,
  ) {
    return this.service.findAll(filter);
  }

  @Get('department/:departmentId')
  findByDepartment(
    @Param('departmentId')
    departmentId: number,
  ) {
    return this.service.findAllByDepartment(departmentId);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: number,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: number,
    @Body()
    dto: any,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: number,
  ) {
    return this.service.remove(id);
  }
}
