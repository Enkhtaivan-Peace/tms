import { TimelineType } from '../enums/timeline-type.enum';

export class TimelineItemDto {
  type!: TimelineType;

  title!: string;

  actorId?: number;

  metadata?: Record<string, any>;

  createdAt!: Date;
}
