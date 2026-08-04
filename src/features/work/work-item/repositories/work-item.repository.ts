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

  async findChildren(parentWorkItemId: number): Promise<WorkItemEntity[]> {
    return this.repository.find({
      where: {
        parentWorkItemId,
      },
      relations: { status: true, assignments: true },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  /**
   * Get parent task
   */
  async findParent(workItemId: number): Promise<WorkItemEntity | null> {
    const item = await this.repository.findOne({
      where: {
        id: workItemId,
      },
      relations: { parent: true },
    });

    return item?.parent ?? null;
  }

  /**
   * Check has sub tasks
   */
  async existsChildren(parentWorkItemId: number): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        parentWorkItemId,
      },
    });

    return count > 0;
  }

  /**
   * Count sub tasks
   */
  async countChildren(parentWorkItemId: number): Promise<number> {
    return this.repository.count({
      where: {
        parentWorkItemId,
      },
    });
  }

  /**
   * Get tree root children
   */
  async findTree(workItemId: number): Promise<WorkItemEntity | null> {
    return this.repository.findOne({
      where: {
        id: workItemId,
      },
      relations: {
        children: true,
      },
    });
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
