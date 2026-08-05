import { Injectable } from '@nestjs/common';

import { TimelineAggregatorService } from './timeline-aggregator.service';

import { WorkTimelineFilterDto } from '../dto/work-timeline-filter.dto';

@Injectable()
export class WorkTimelineQueryService {
  constructor(private readonly aggregator: TimelineAggregatorService) {}

  async findAll(filter: WorkTimelineFilterDto) {
    const {
      workItemId,
      eventType,
      fromDate,
      toDate,
      page = 1,
      limit = 20,
    } = filter;

    let timeline = await this.aggregator.aggregate(workItemId);

    /**
     * Filter by event type
     */
    if (eventType) {
      timeline = timeline.filter((item) => item.type === eventType);
    }

    /**
     * Filter by date range
     */
    if (fromDate) {
      timeline = timeline.filter(
        (item) => item.createdAt >= new Date(fromDate),
      );
    }

    if (toDate) {
      timeline = timeline.filter((item) => item.createdAt <= new Date(toDate));
    }

    const total = timeline.length;

    /**
     * Pagination
     */
    const start = (page - 1) * limit;

    const items = timeline.slice(start, start + limit);

    return {
      items,

      meta: {
        total,

        page,

        limit,

        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
