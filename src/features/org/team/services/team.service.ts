import { Injectable, NotFoundException } from '@nestjs/common';

import { TeamRepository } from '../repositories/team.repository';

import { CreateTeamDto } from '../dto/create-team.dto';
import { TeamQueryRepository } from '../repositories/team-query.repository';
import { TeamFilterDto } from '../dto/team-filter.dto';

@Injectable()
export class TeamService {
  constructor(
    private repository: TeamRepository,
    private queryRepository: TeamQueryRepository,
  ) {}

  create(dto: CreateTeamDto) {
    const team = this.repository.create(dto);

    return this.repository.save(team);
  }

  findOne(id: number) {
    return this.repository.findActive(id);
  }

  findAll(filter: TeamFilterDto) {
    return this.queryRepository.findAll(filter);
  }

  findAllByDepartment(departmentId: number) {
    return this.repository.find({
      where: {
        departmentId,
      },
    });
  }

  async update(id: number, dto: any) {
    await this.repository.update(id, dto);

    return this.findOne(id);
  }

  remove(id: number) {
    return this.repository.softDelete(id);
  }
}
