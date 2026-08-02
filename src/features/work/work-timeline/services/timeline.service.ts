import { Injectable } from '@nestjs/common';
import { TimelineAggregatorService } from './timeline-aggregator.service';

@Injectable()
export class TimelineService {
  constructor(private readonly aggregator: TimelineAggregatorService) {}

  async findByWorkItem(workItemId: number) {
    return this.aggregator.aggregate(workItemId);
  }
}
