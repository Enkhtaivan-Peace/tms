import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { WorkActivityService } from '../services/work-activity.service';

import { WorkActivityFilterDto } from '../dto/work-activity-filter.dto';

@Controller('work-activities')
export class WorkActivityController {
  constructor(private readonly service: WorkActivityService) {}

  /**
   *
   * Activity list
   *
   * GET
   * /work-activities?page=1&limit=20
   *
   */
  @Get()
  findAll(
    @Query()
    filter: WorkActivityFilterDto,
  ) {
    return this.service.findAll(filter);
  }

  /**
   *
   * Activity detail
   *
   * GET
   * /work-activities/:id
   *
   */
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findOne(id);
  }

  /**
   *
   * WorkItem activity timeline
   *
   * GET
   * /work-activities/work-item/:workItemId
   *
   */
  @Get('work-item/:workItemId')
  findByWorkItem(
    @Param('workItemId', ParseIntPipe)
    workItemId: number,
  ) {
    return this.service.findByWorkItem(workItemId);
  }

  /**
   *
   * User activity history
   *
   * GET
   * /work-activities/actor/:actorId
   *
   */
  @Get('actor/:actorId')
  findByActor(
    @Param('actorId', ParseIntPipe)
    actorId: number,
  ) {
    return this.service.findByActor(actorId);
  }
}
