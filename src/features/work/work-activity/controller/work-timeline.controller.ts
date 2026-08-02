import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { WorkTimelineQueryService } from '../services/work-timeline-query.service';

@Controller('work-items')
export class WorkTimelineController {
  constructor(private readonly timelineService: WorkTimelineQueryService) {}

  @Get(':id/timeline')
  async timeline(
    @Param('id', ParseIntPipe)
    workItemId: number,
  ) {
    return this.timelineService.findByWorkItem(workItemId);
  }
}
