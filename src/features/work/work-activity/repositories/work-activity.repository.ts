import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { IsNull, Repository } from 'typeorm';

import { BaseRepository } from 'src/common/base/base.repository';

import { WorkActivityEntity } from '../entities/work-activity.entity';

@Injectable()
export class WorkActivityRepository extends BaseRepository<WorkActivityEntity> {
  constructor(
    @InjectRepository(WorkActivityEntity)
    repository: Repository<WorkActivityEntity>,
  ) {
    super(repository);
  }

  /**
   * Find active activity by id
   */
  async findActiveById(id: number): Promise<WorkActivityEntity | null> {
    return this.repository.findOne({
      where: {
        id,

        deletedAt: IsNull(),
      },

      relations: {
        workItem: true,

        actor: true,
      },
    });
  }

  /**
   * Find activities by WorkItem
   *
   * Used:
   * - WorkItem detail page
   * - Activity timeline
   */
  async findByWorkItem(workItemId: number): Promise<WorkActivityEntity[]> {
    return this.repository.find({
      where: {
        workItemId,

        deletedAt: IsNull(),
      },

      relations: {
        actor: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  /**
   * Find activities by actor
   */
  async findByActor(actorId: number): Promise<WorkActivityEntity[]> {
    return this.repository.find({
      where: {
        actorId,

        deletedAt: IsNull(),
      },

      relations: {
        workItem: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findTimeline(workItemId: number) {
    return this.findAll({
      where: {
        workItemId,
      },
    });
  }

  /**
   * Soft delete
   */
  async remove(id: number) {
    return this.repository.softDelete(id);
  }
}
