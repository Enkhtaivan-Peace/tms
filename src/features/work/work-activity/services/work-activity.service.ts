import { Injectable, NotFoundException } from '@nestjs/common';

import { WorkActivityRepository } from '../repositories/work-activity.repository';

import { WorkActivityQueryRepository } from '../repositories/work-activity-query.repository';

import { CreateWorkActivityDto } from '../dto/create-work-activity.dto';

import { WorkActivityFilterDto } from '../dto/work-activity-filter.dto';

@Injectable()
export class WorkActivityService {
  constructor(
    private readonly repository: WorkActivityRepository,

    private readonly queryRepository: WorkActivityQueryRepository,
  ) {}

  /**
   * Create activity
   *
   * Internal usage:
   *
   * WorkItemService
   * WorkItemAssignmentService
   * WorkStatusTransitionService
   */
  async create(dto: CreateWorkActivityDto) {
    return this.repository.create({
      ...dto,
    });
  }

  /**
   * Activity list
   *
   * Pagination
   * Search
   * Sort
   */
  async findAll(filter: WorkActivityFilterDto) {
    return this.queryRepository.findAll(filter);
  }

  /**
   * Activity detail
   */
  async findOne(id: number) {
    const activity = await this.repository.findActiveById(id);

    if (!activity) {
      throw new NotFoundException('Work activity not found');
    }

    return activity;
  }

  /**
   * WorkItem timeline
   *
   * Used:
   *
   * GET /work-items/:id/activity
   */
  async findByWorkItem(workItemId: number) {
    return this.repository.findByWorkItem(workItemId);
  }

  /**
   * User activity history
   */
  async findByActor(actorId: number) {
    return this.repository.findByActor(actorId);
  }

  /**
   * Remove activity
   *
   * Soft delete
   */
  async remove(id: number) {
    await this.findOne(id);

    return this.repository.softDelete(id);
  }
}
