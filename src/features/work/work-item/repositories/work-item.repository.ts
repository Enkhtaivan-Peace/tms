import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { IsNull, Repository } from 'typeorm';

import { BaseRepository } from 'src/common/base/base.repository';

import { WorkItemEntity } from '../entities/work-item.entity';

@Injectable()
export class WorkItemRepository extends BaseRepository<WorkItemEntity> {
  constructor(
    @InjectRepository(WorkItemEntity)
    repository: Repository<WorkItemEntity>,
  ) {
    super(repository);
  }

  /**
   * Find by business code
   *
   * Example:
   * TASK-000001
   */
  async findByCode(code: string): Promise<WorkItemEntity | null> {
    return this.repository.findOne({
      where: {
        code,

        deletedAt: IsNull(),
      },
    });
  }

  /**
   * Detail view
   *
   * WorkItem detail page
   */
  async findDetail(id: number): Promise<WorkItemEntity | null> {
    return this.repository.findOne({
      where: {
        id,

        deletedAt: IsNull(),
      },

      relations: {
        workTemplate: true,

        status: true,
      },
    });
  }

  /**
   * Check duplicate code
   */
  async existsByCode(code: string): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        code,

        deletedAt: IsNull(),
      },
    });

    return count > 0;
  }

  /**
   * Find active work item
   */
  async findActiveById(id: number): Promise<WorkItemEntity | null> {
    return this.repository.findOne({
      where: {
        id,

        deletedAt: IsNull(),
      },
    });
  }

  /**
   * Update current status
   *
   * Used by WorkStatusTransition
   */
  async updateStatus(
    id: number,

    statusId: number,
  ) {
    return this.repository.update(
      id,

      {
        statusId,
      },
    );
  }

  /**
   * Soft delete
   */
  async remove(id: number) {
    return this.repository.softDelete(id);
  }
}
