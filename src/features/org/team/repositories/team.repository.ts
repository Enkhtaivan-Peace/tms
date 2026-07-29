import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { TeamEntity } from '../entities/team.entity';

@Injectable()
export class TeamRepository extends Repository<TeamEntity> {
  constructor(datasource: DataSource) {
    super(TeamEntity, datasource.manager);
  }

  findActive(id: number) {
    return this.createQueryBuilder('team')
      .where('team.id = :id', { id })
      .andWhere('team.deletedAt IS NULL')
      .getOne();
  }
}
