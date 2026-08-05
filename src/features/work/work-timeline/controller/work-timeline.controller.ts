import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { WorkTimelineQueryService } from '../services/work-timeline-query.service';
import { WorkTimelineFilterDto } from '../dto/work-timeline-filter.dto';

@Controller('work-items')
export class WorkTimelineController {
  constructor(
    private readonly workTimelineQueryService: WorkTimelineQueryService,
  ) {}

  /**
   * Get work item timeline
   *
   * GET /work-items/:id/timeline
   *
   * Query:
   * ?page=1
   * ?limit=20
   * ?eventType=COMMENT_CREATED
   * ?fromDate=2026-08-01
   * ?toDate=2026-08-05
   */
  @Get(':id/timeline')
  async findTimeline(
    @Param('id', ParseIntPipe)
    workItemId: number,

    @Query()
    filter: WorkTimelineFilterDto,
  ) {
    return this.workTimelineQueryService.findAll({
      ...filter,
      workItemId,
    });
  }
}
