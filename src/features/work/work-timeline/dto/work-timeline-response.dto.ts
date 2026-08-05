import { TimelineEventType } from './timeline-event-type.enum';

export class WorkTimelineResponseDto {
  id!: number;

  type!: TimelineEventType;

  title!: string;

  description?: string;

  actor?: {
    id: number;
    name: string;
  };

  metadata?: Record<string, any>;

  createdAt!: Date;
}
