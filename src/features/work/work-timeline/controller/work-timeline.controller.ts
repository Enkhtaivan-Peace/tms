import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TimelineService } from '../services/timeline.service';

@Controller('work-items')
export class WorkTimelineController {
  constructor(private readonly service: TimelineService) {}

  @Get(':id/timeline')
  async timeline(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.service.findByWorkItem(id);
  }
}
